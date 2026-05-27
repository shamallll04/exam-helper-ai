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
// RAZORPAY
// =====================================

const razorpay = new Razorpay({

  key_id:
    process.env.RAZORPAY_KEY_ID,

  key_secret:
    process.env.RAZORPAY_KEY_SECRET
})

// =====================================
// AI ROUTE
// =====================================

app.post("/generate", async (req, res) => {

  try {

    const { notes } = req.body

    const response = await axios.post(

      "https://openrouter.ai/api/v1/chat/completions",

      {
        model: "openai/gpt-4o-mini",

        messages: [
          {
            role: "user",

            content:
              `Generate exam questions from these notes:\n\n${notes}`
          }
        ]
      },

      {
        headers: {

          Authorization:
            `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "Content-Type":
            "application/json"
        }
      }
    )

    res.json(response.data)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      error: "AI request failed"
    })
  }
})

// =====================================
// PAYMENT ROUTE
// =====================================

app.post("/create-order", async (req, res) => {

  try {

    const options = {

      amount: 99900,

      currency: "INR",

      receipt:
        "receipt_order_1"
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

app.listen(5000, () => {

  console.log(
    "Server running on http://localhost:5000"
  )
})