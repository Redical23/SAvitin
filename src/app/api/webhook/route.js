import { NextResponse } from "next/server";
import Subscription from "../../models/Subscription";
import connectDB from "../../lib/dbConnect";

export async function POST(req) {
    await connectDB();

    const body = await req.json();
    if (body.event !== "payment.captured") {
        return NextResponse.json({ success: false, message: "Invalid event" }, { status: 400 });
    }

    const { email, plan } = body.payload.payment.entity.notes; // Assuming email is stored in Razorpay notes

    await Subscription.create({ userEmail: email, plan });

    return NextResponse.json({ success: true });
}
