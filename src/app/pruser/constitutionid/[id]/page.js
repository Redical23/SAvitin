
// No "use client" here → it's a server component
import { MongoClient, ObjectId } from "mongodb";
import ConstitutionDetailClient from "./ConstitutionDetailClient";

async function getUserData(id) {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();

  let user;
  try {
    user = await db.collection("constitutions").findOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.error("Invalid ObjectId:", error);
    return null;
  } finally {
    await client.close();
  }

  // Convert MongoDB document to a plain object (remove _id or convert to string)
  if (user) {
    user._id = user._id.toString();
  }

  return user;
}


export default async function ConstitutionDetailPage({ params }) {
  const { id } = await params;
  const userData = await getUserData(id);

  // Pass fetched data to client component
  return <ConstitutionDetailClient userData={userData} />;
}
