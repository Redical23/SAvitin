import dbConnect from "../../lib/dbConnect";
import News from "../../models/News";

export async function POST(req) {
  await dbConnect();

  try {
    const data = await req.json();

    // Basic validation – headline and description are required.
    if (!data.headline || !data.description) {
        return new Response(
          JSON.stringify({ error: "Missing required fields: headline and description." }),
          {
            status: 422,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      
      // Create a new News document with the provided data.
      const newNews = await News.create(data);
      
      return new Response(JSON.stringify(newNews), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });} catch (error) { console.error("Error creating news:", error); return new Response( JSON.stringify({ error: "Failed to create news", message: error.message }), { status: 500, headers: { "Content-Type": "application/json" }, } ); } }
      