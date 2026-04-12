const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Order = require('./models/order.js');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Gemini AI Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


// 🔁 Retry + Error Handling Function
const generateWithRetry = async (modelName, prompt) => {
  const model = genAI.getGenerativeModel({ model: modelName });

  for (let i = 0; i < 3; i++) {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      // Handle overload OR quota
      if (err.status === 503 || err.status === 429) {
        console.log(`⏳ Retry ${i + 1} for ${modelName}...`);
        await new Promise(r => setTimeout(r, 2000));
      } else {
        throw err;
      }
    }
  }

  throw new Error("Model busy or quota exceeded");
};


// ================= ROUTES =================

// 1. AI Description
app.post('/api/generate-description', async (req, res) => {
  try {
    const { productName } = req.body;

    if (!productName) {
      return res.status(400).json({ error: "Product name required" });
    }

    const prompt = `Write a short, creative product description for "${productName}" focusing on wellness benefits (2 sentences).`;

    let text;

    try {
      // 🔥 Primary model (best)
      text = await generateWithRetry("gemini-2.5-flash", prompt);

    } catch (err) {
      console.log("⚠️ Switching to fallback model...");

      try {
        // ⚡ Fallback model (stable)
        text = await generateWithRetry("gemini-2.0-flash", prompt);

      } catch (err2) {
        return res.status(503).json({
          error: "AI service busy or quota exceeded. Try again later."
        });
      }
    }

    res.json({ description: text });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "AI failed" });
  }
});


// 2. Place Order
app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ error: "Order failed" });
  }
});


// 3. Get Orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ _id: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Fetch failed" });
  }
});


// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));