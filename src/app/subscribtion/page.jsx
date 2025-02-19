"use client";
import { useState, useEffect } from "react";

export default function Subscription() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!document.querySelector("script[src='https://checkout.razorpay.com/v1/checkout.js']")) {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    const handleSubscribe = async (plan) => {
        setLoading(true);

        const amount = plan === "pro" ? 49900 : 19900;

        // Fetch order from backend
        const res = await fetch("/api/payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount, email: "user@example.com", plan })
        });

        const order = await res.json();

        if (!order.id) {
            alert("Payment initiation failed!");
            setLoading(false);
            return;
        }

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: amount,
            currency: "INR",
            name: "Your App Name",
            description: "Subscription Payment",
            order_id: order.id,
            handler: function (response) {
                alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
                setLoading(false);
            },
            prefill: {
                name: "User Name",
                email: "user@example.com",
                contact: "9999999999",
            },
            theme: { color: "#3399cc" },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">Choose a Subscription Plan</h1>
            <div className="space-y-4">
                <div className="border p-4 rounded">
                    <h2 className="text-xl font-semibold">Basic Plan</h2>
                    <p>₹199/month</p>
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 mt-2"
                        onClick={() => handleSubscribe("basic")}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Subscribe"}
                    </button>
                </div>
               
            </div>
        </div>
    );
}
