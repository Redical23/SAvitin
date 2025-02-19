import Razorpay from "razorpay";


// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

export const createPaymentLink = async (orderId) => {
    try {
        // Fetch order details
        const order = await orderService.findOrderById(orderId);
        if (!order) throw new Error("Order not found");

        // Create a Razorpay Payment Link
        const paymentLinkRequest = await razorpay.paymentLink.create({
            amount: order.amount * 100, // Convert to paisa
            currency: "INR",
            description: `Payment for Order ${orderId}`,
            customer: {
                name: order.customerName,
                email: order.customerEmail,
                contact: order.customerPhone
            },
            notify: {
                sms: true,
                email: true
            },
            reminder_enable: true,
            callback_url: `http://localhost:3000/payment/${orderId}`, // Fixed URL formatting
            callback_method: "get"
        });

        // Extract ID and Short URL correctly
        const paymentlinkid = paymentLinkRequest.id;
        const payment_Link_url = paymentLinkRequest.short_url;

        return { paymentlinkid, payment_Link_url };
    } catch (error) {
        console.error("Error creating payment link:", error);
        throw error;
    }
};

export const updatePaymentInformation = async (resData) => {
    try {
        const paymentId = resData.payment_id;
        const orderId = resData.order_id;

        // Fetch order details
        const order = await orderService.findOrderById(orderId);
        if (!order) throw new Error("Order not found");

        // Fetch payment details from Razorpay
        const payment = await razorpay.payments.fetch(paymentId);

        if (payment.status === "captured") {
            order.paymentDetails = {
                paymentId: paymentId,
                status: "COMPLETED"
            };
            order.orderStatus = "PLACED";

            await order.save();
        }

        return { message: "Your order is placed", success: true };
    } catch (error) {
        console.error("Error updating payment information:", error);
        throw error;
    }
};
