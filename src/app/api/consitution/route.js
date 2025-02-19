import dbConnect from "../../lib/dbConnect";
import constitution from "../../models/Consitutution";

export async function GET(req) {
  await dbConnect();

  try {
    const news = await  constitution.find({});
    
    return new Response(JSON.stringify(news), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch news' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(req) {
  await dbConnect();
  
  try {
    const body = await req.json();

    // Add in "inWhichCourt" option if not provided
    if (!body.inWhichCourt) {
      body.inWhichCourt = "Not specified"; // Set a default value or modify as needed
    }
    
    const newDocument = await constitution.create(body);
    
    return new Response(JSON.stringify(newDocument), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to create document", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}