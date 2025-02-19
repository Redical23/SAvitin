import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req) {
    try {
        const { plan } = await req.json();

        // Define plan prices in paise (₹499 → 49900, ₹199 → 19900)
        const price = plan === "pro" ? 49900 : 19900;

        // Initialize Razorpay instance
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        // Create an order in Razorpay
        const order = await razorpay.orders.create({
            amount: price,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        });

        return NextResponse.json({ success: true, order });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
