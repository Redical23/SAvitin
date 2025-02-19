import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    plan: { type: String, enum: ["basic", "pro"], required: true },
    status: { type: String, default: "active" },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Subscription || mongoose.model("Subscription", SubscriptionSchema);
