"use server"

import { MongoClient, ObjectId } from "mongodb"
import { revalidatePath } from "next/cache"

export async function updateDocument(id: string, data: any) {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI!)
    const db = client.db()

    const result = await db.collection("constitutions").updateOne({ _id: new ObjectId(id) }, { $set: data })

    await client.close()

    if (result.matchedCount === 0) {
      return { success: false, error: "Document not found" }
    }

    revalidatePath(`/constitution/${id}`)
    return { success: true }
  } catch (error) {
    console.error("Error updating document:", error)
    return { success: false, error: "Failed to update document" }
  }
}

export async function deleteDocument(id: string) {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI!)
    const db = client.db()

    const result = await db.collection("constitutions").deleteOne({
      _id: new ObjectId(id),
    })

    await client.close()

    if (result.deletedCount === 0) {
      return { success: false, error: "Document not found" }
    }

    revalidatePath("/constitution")
    return { success: true }
  } catch (error) {
    console.error("Error deleting document:", error)
    return { success: false, error: "Failed to delete document" }
  }
}
