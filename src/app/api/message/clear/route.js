import { NextResponse } from "next/server"
import dbConnect from "../../../lib/dbConnect"
import { MongoClient } from "mongodb"

export async function DELETE(request) {
  try {
    const body = await request.json()
    const { action, lawyer, clientEmail } = body

    await dbConnect() // Use centralized database connection

    const client = new MongoClient(process.env.MONGODB_URI)
    const db = client.db("account") // Replace with your actual database name
    const conversationsCollection = db.collection("conversations")

    if (action === "clear") {
      // Clear messages in the conversation between lawyer and client
      const result = await conversationsCollection.updateOne(
        {
          participants: {
            $all: [lawyer, clientEmail],
          },
        },
        {
          $set: {
            messages: [], // Clear all messages by setting to empty array
          },
        }
      )

      if (result.matchedCount === 0) {
        return NextResponse.json(
          {
            error: "Conversation not found",
          },
          { status: 404 }
        )
      }

      console.log(`Messages cleared between ${lawyer} and ${clientEmail}`)

      return NextResponse.json({
        success: true,
        message: "Messages cleared successfully",
        modifiedCount: result.modifiedCount,
      })
    } else {
      // Delete entire conversation
      const result = await conversationsCollection.deleteOne({
        participants: {
          $all: [lawyer, clientEmail],
        },
      })

      if (result.deletedCount === 0) {
        return NextResponse.json(
          {
            error: "Conversation not found",
          },
          { status: 404 }
        )
      }

      console.log(`Entire conversation deleted between ${lawyer} and ${clientEmail}`)

      return NextResponse.json({
        success: true,
        message: "Conversation deleted successfully",
        deletedCount: result.deletedCount,
      })
    }
  } catch (error) {
    console.error("Error in message API:", error)
    return NextResponse.json(
      {
        error: "Internal server error: " + error.message,
      },
      { status: 500 }
    )
  }
}