import { NextResponse } from "next/server";
import dbconnect from "../../lib/dbConnect";
import mongoose from "mongoose";
import { type } from "os";

// Define a Mongoose schema

// Define Mongoose schema
const PostSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // ✅ Explicitly saving `id`
  name: { type: String, required: true }, 
  avatar: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String },
  company: { type: String, default: "Your Company" },
  position: { type: String, default: "New Internship" },
  location: { type: String, default: "To be specified" },
  postedAt: { type: Date, default: Date.now },
  companyLogo: { type: String },
  email: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
}, { timestamps: true });

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

// POST handler: Create a new post
export async function POST(req) {
  try {
    await dbconnect();

    const body = await req.json();
    const { id, name, avatar, description, link, location, email } = body; 

    if (!id || !description) {
      return NextResponse.json(
        { success: false, message: "ID and description are required" },
        { status: 400 }
      );
    }

    if (!email || !name || !avatar) {
      return NextResponse.json(
        { success: false, message: "User information is missing" },
        { status: 400 }
      );
    }

 

    // ✅ Create a new post with the given `id`
    const newPost = await Post.create({
      id,  // ✅ Now storing the `id` from request body
      name,
      avatar,
      description,
      link,
      location: location || "To be specified",
      company: "Your Company",
      position: "New Internship",
      postedAt: new Date(),
      companyLogo:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100",
      likes: 0,
      comments: 0,
      email,
    });

    return NextResponse.json({
      success: true,
      message: "Post created successfully",
      data: newPost,
    });
  } catch (error) {
    console.error("❌ Error in POST /api/posts:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}


// GET handler: Fetch all posts
export async function GET() {
  try {
    await dbconnect();
    const posts = await Post.find({}).sort({ createdAt: -1 }); // Fetch & sort by latest

    console.log("📢 Retrieved posts:", posts); // Debugging line

    if (!posts.length) {
      return NextResponse.json({ success: false, message: "No posts found" });
    }

    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    console.error("❌ Error in GET /api/posts:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}




export async function DELETE(req) {
  await dbconnect();

  try {
    const { id } = await req.json();
    console.log("Delete request for:", id);

    if (!id) {
      return new Response(JSON.stringify({ error: "Email is required." }), { 
        status: 400, headers: { "Content-Type": "application/json" } 
      });
    }

    // Find and delete the user
    const deletedUser = await Post.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) });

    if (!deletedUser) {
      return new Response(JSON.stringify({ error: "User not found." }), { 
        status: 404, headers: { "Content-Type": "application/json" } 
      });
    }

    return new Response(JSON.stringify({ message: "Account deleted successfully." }), { 
      status: 200, headers: { "Content-Type": "application/json" } 
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    return new Response(JSON.stringify({ error: "Failed to delete account." }), { 
      status: 500, headers: { "Content-Type": "application/json" } 
    });
  }
}
