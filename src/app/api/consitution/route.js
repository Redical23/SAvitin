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


export async function DELETE(req) {
  await dbConnect()

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return new Response(JSON.stringify({ error: "Document ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const deletedDocument = await constitution.findByIdAndDelete(id)

    if (!deletedDocument) {
      return new Response(JSON.stringify({ error: "Document not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    return new Response(JSON.stringify({ message: "Document deleted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete document", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export async function PUT(req) {
  await dbConnect()

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    const body = await req.json()

    if (!id) {
      return new Response(JSON.stringify({ error: "Document ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const updatedDocument = await constitution.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })

    if (!updatedDocument) {
      return new Response(JSON.stringify({ error: "Document not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    return new Response(JSON.stringify(updatedDocument), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update document", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
