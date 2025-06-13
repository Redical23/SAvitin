import { NextResponse } from "next/server";
import dbconnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export async function PATCH(request) {
  try {
    const { orderId, email, subscribe, subscriptionExpiry } = await request.json();
    console.log(email, subscribe, subscriptionExpiry, orderId, "received data");

    // Decode email
    const decodedEmail = decodeURIComponent(email);
    if (!decodedEmail) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await dbconnect();

    // Prepare the new subscription data
    const newSubscriptionData = {
      orderId,
      email: decodedEmail,
      subscribe,
      subscriptionExpiry,
    };

    // Push this new data into a `subscriptions` array (at index 0 or as the first element)
    const user = await User.findOneAndUpdate(
      { email: decodedEmail },
      {
        $set: {
          "subscriptions.0": newSubscriptionData, // store in subscriptions[0]
        },
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Subscription updated", user });
  } catch (error) {
    console.error("Error updating subscription:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
