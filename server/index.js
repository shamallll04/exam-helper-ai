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
// RAZORPAY
// =====================================

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

// =====================================
// AI ROUTE
// =====================================

app.post("/generate", async (req, res) => {

  try {

    const {
      notes,
      language
    } = req.body

    if (!notes) {

      return res.status(400).json({
        error: "Notes required"
      })
    }

    const response = await axios.post(

      "https://openrouter.ai/api/v1/chat/completions",

      {
        model: "openai/gpt-4o-mini",

        messages: [
          {
            role: "user",

            content:
              `Explain these study notes in very simple ${language} language for students to easily understand.\n\n${notes}`
          }
        ]
      },

      {
        headers: {

          Authorization:
            `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "Content-Type":
            "application/json",

          "HTTP-Referer":
            "https://exam-helper-ai-1.vercel.app",

          "X-Title":
            "StudyEasy AI"
        }
      }
    )

    res.json(response.data)

  } catch (error) {

    console.log(
      error?.response?.data || error.message
    )

    res.status(500).json({
      error: "AI request failed"
    })
  }
})

// =====================================
// RAZORPAY ORDER
// =====================================

app.post("/create-order", async (req, res) => {

  try {

    const options = {

      amount: 99900,

      currency: "INR",

      receipt: "receipt_order_1"
    }

    const order =
      await razorpay.orders.create(
        options
      )

    res.json(order)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: error.message
    })
  }
})

// =====================================
// START SERVER
// =====================================

const PORT =
  process.env.PORT || 5000

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  )
})