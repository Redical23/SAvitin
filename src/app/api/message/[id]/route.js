import { NextResponse } from "next/server"
import { MongoClient, ObjectId } from "mongodb"

// Replace with your MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || "your-mongodb-connection-string"

// Create a MongoDB client with connection pooling
let clientPromise

if (!global._mongoClientPromise) {
  const client = new MongoClient(MONGODB_URI, {
    maxPoolSize: 10,
    minPoolSize: 5,
  })
  global._mongoClientPromise = client.connect()
}
clientPromise = global._mongoClientPromise

// DELETE a specific message by ID
export async function DELETE(request, { params }) {
  try {
    const { id } = params

    console.log("Attempting to delete message with ID:", id)

    if (!id) {
      return NextResponse.json({ error: "Message ID is required" }, { status: 400 })
    }

    // Validate ObjectId format
    let objectId
    try {
      objectId = new ObjectId(id)
    } catch (err) {
      return NextResponse.json({ error: "Invalid message ID format" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db() // Uses the default database from your connection string
    const conversationsCollection = db.collection("conversations")

    // Find the conversation containing this message
    const conversation = await conversationsCollection.findOne({
      "messages._id": objectId,
    })

    if (!conversation) {
      console.log("Message not found in any conversation")
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    console.log("Found message in conversation:", conversation._id)

    // Remove the message from the messages array
    const result = await conversationsCollection.updateOne(
      { "messages._id": objectId },
      { $pull: { messages: { _id: objectId } } },
    )

    console.log("Update result:", result)

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Message deleted successfully",
      modifiedCount: result.modifiedCount,
    })
  } catch (error) {
    console.error("Error deleting message:", error)
    return NextResponse.json({ error: "Internal server error: " + error.message }, { status: 500 })
  }
}

// PATCH to update a specific message content
export async function PATCH(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()
    const { content } = body

    console.log("Attempting to update message with ID:", id)
    console.log("New content:", content)

    if (!id) {
      return NextResponse.json({ error: "Message ID is required" }, { status: 400 })
    }

    // Validate ObjectId format
    let objectId
    try {
      objectId = new ObjectId(id)
    } catch (err) {
      return NextResponse.json({ error: "Invalid message ID format" }, { status: 400 })
    }

    if (!content || typeof content !== "string") {
      return NextResponse.json({ error: "Content is required and must be a string" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db() // Uses the default database from your connection string
    const conversationsCollection = db.collection("conversations")

    // Find the conversation containing this message
    const conversation = await conversationsCollection.findOne({
      "messages._id": objectId,
    })

    if (!conversation) {
      console.log("Message not found in any conversation")
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    console.log("Found message in conversation:", conversation._id)

    // Update the specific message in the array
    const result = await conversationsCollection.updateOne(
      { "messages._id": objectId },
      { $set: { "messages.$.content": content } },
    )

    console.log("Update result:", result)

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Message updated successfully",
      modifiedCount: result.modifiedCount,
    })
  } catch (error) {
    console.error("Error updating message:", error)
    return NextResponse.json({ error: "Internal server error: " + error.message }, { status: 500 })
  }
}
