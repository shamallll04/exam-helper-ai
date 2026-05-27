import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import axios from "axios"
import Razorpay from "razorpay"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// =====================================
// HEALTH CHECK
// =====================================
app.get("/", (req, res) => {
  res.send("Server is LIVE 🚀")
})

// =====================================
// RAZORPAY INIT
// =====================================
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

// =====================================
// AI GENERATION ROUTE
// =====================================
app.post("/generate", async (req, res) => {
  try {
    const { notes } = req.body

    if (!notes) {
      return res.status(400).json({ error: "Notes are required" })
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Generate exam questions from these notes:\n\n${notes}`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",

          // important for OpenRouter
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "Exam Helper AI"
        }
      }
    )

    res.json(response.data)

  } catch (error) {
    console.log(
      "AI ERROR:",
      error?.response?.data || error.message
    )

    res.status(500).json({
      error: "AI request failed"
    })
  }
})

// =====================================
// RAZORPAY ORDER ROUTE
// =====================================
app.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: 99900, // ₹999
      currency: "INR",
      receipt: "receipt_order_1"
    }

    const order = await razorpay.orders.create(options)

    res.json(order)

  } catch (error) {
    console.log("PAYMENT ERROR:", error.message)

    res.status(500).json({
      error: error.message
    })
  }
})

// =====================================
// START SERVER
// =====================================
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})