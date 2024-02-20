const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/payment.Model");

exports.Pyament = async (req, res) => {
  try {
    const { userDetails } = req.body;

    // Extracting user details
    const { name, email, amount } = userDetails;

    if (!amount || !email || !name) {
      return res.status(404).json({
        success: false,
        message: "All fields are required !",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format.",
      });
    }

    // Validate amount (should be a positive number)
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount. Please provide a valid positive number.",
      });
    }

    // Create a PaymentMethod using the token
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          description: `Payment for ${name} (${email})`,
          amount: amount * 100,
          currency: "inr",
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
      customer_email: email,
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Error processing payment:", error);
    return res.status(500).json({ error: "Failed to process payment" });
  }
};
