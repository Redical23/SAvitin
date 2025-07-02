import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

export async function POST(req) {
  await dbConnect();

  try {
    // Extract data from the request body
    const { email, newsId } = await req.json();
    console.log("Received bookmark data:", { email, newsId });

    // Check if email and newsId are provided
    if (!email || !newsId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      // If user doesn't exist, create a new user document with the bookmark
      await User.create({ email, bookmarks: [newsId] });
      return new Response(
        JSON.stringify({ message: "Bookmarked successfully." }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      // Add newsId to bookmarks if not already present
      if (!user.bookmarks.includes(newsId)) {
        user.bookmarks.push(newsId);
        await user.save();
      }
      return new Response(
        JSON.stringify({ message: "Bookmarked successfully." }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error bookmarking article:", error);
    return new Response(
      JSON.stringify({ error: "Failed to bookmark article." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}


import News from "../../models/News";

export async function GET(req) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const newsId = searchParams.get("newsId");
    const ids = searchParams.get("ids")?.split(",") || [];

    // ✅ Check if a specific article is bookmarked by the user
    if (email && newsId) {
      const user = await User.findOne({ email });
      const isBookmarked = user?.bookmarks?.includes(newsId) || false;

      return new Response(JSON.stringify({ isBookmarked }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 🔄 Existing fallback for bulk news fetch
    let news;
    if (ids.length > 0) {
      news = await News.find({ _id: { $in: ids } });
    } else {
      news = await News.find({});
    }

    return new Response(JSON.stringify(news), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error in GET /api/bookmark:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


export async function DELETE(req) {
  await dbConnect();

  try {
    const { email, newsId } = await req.json();

    if (!email || !newsId) {
      return new Response(
        JSON.stringify({ error: "Missing email or newsId." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    user.bookmarks = user.bookmarks.filter(id => id !== newsId);
    await user.save();

    return new Response(
      JSON.stringify({ message: "Bookmark removed." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error removing bookmark:", error);
    return new Response(
      JSON.stringify({ error: "Failed to remove bookmark." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
