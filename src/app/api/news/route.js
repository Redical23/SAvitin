import dbConnect from "../../lib/dbConnect";
import Product from "../../models/News";
import { ObjectId } from "mongodb";

export async function GET(req) {
  await dbConnect();

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const category = url.searchParams.get("category");
  const excludeId = url.searchParams.get("excludeId");

  try {
    let products;

    // ✅ Handle invalid ObjectId format
    if (id && !ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: "Invalid ID format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ✅ Fetch a single product by ID
    if (id) {
      const product = await Product.findOne({ _id: new ObjectId(id) });

      if (!product) {
        return new Response(JSON.stringify({ error: "Product not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify(product), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ✅ Fetch related products by category (excluding one)
    if (category) {
      products = await Product.find({
        category,
        _id: excludeId ? { $ne: new ObjectId(excludeId) } : { $exists: true },
        featured: { $ne: true },
      }).limit(4);

      return new Response(JSON.stringify(products), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ✅ Default: Fetch all products
    products = await Product.find({});
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}



export async function DELETE(req) {
  await dbConnect();

  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ error: "News ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Handle invalid ObjectId format
    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: "Invalid ID format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const deletedNews = await News.findByIdAndDelete(id);

    if (!deletedNews) {
      return new Response(JSON.stringify({ error: "News article not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "News article deleted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting news:", error);
    return new Response(JSON.stringify({ error: "Failed to delete news article", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(req) {
  await dbConnect();

  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const body = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ error: "News ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Handle invalid ObjectId format
    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: "Invalid ID format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const updatedNews = await News.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedNews) {
      return new Response(JSON.stringify({ error: "News article not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(updatedNews), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating news:", error);
    return new Response(JSON.stringify({ error: "Failed to update news article", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}