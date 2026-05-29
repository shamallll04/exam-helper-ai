import { useState } from "react"

function App() {

  const [notes, setNotes] = useState("")
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)

  // =====================================
  // AI GENERATION
  // =====================================

  async function generateQuestions() {

    try {

      setLoading(true)

      const res = await fetch(
        "https://exam-helper-ai-1.onrender.com/generate",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            notes
          })
        }
      )

      const data = await res.json()

      setOutput(
        data?.choices?.[0]?.message?.content ||
        "No response"
      )

    } catch (error) {

      console.log(error)

      alert("Generation failed")

    } finally {

      setLoading(false)
    }
  }

  // =====================================
  // RAZORPAY PAYMENT
  // =====================================

  async function upgradeToPro() {

    try {

      const response = await fetch(
        "https://exam-helper-ai-1.onrender.com/create-order",
        {
          method: "POST"
        }
      )

      const order = await response.json()

      console.log(order)

      if (!order.id) {

        alert("Order creation failed")

        return
      }

      const options = {

        // REPLACE WITH YOUR REAL KEY
        key: "rzp_test_xxxxxxxxx",

        amount: order.amount,

        currency: order.currency,

        name: "Exam Helper AI",

        description: "Pro Upgrade",

        order_id: order.id,

        handler: function (response) {

          alert("Payment Successful 🚀")

          console.log(response)
        },

        prefill: {

          name: "User",

          email: "user@example.com",

          contact: "9999999999"
        },

        theme: {
          color: "#6366f1"
        }
      }

      const razorpay = new window.Razorpay(options)

      razorpay.open()

    } catch (error) {

      console.log(error)

      alert("Payment failed")
    }
  }

  return (

    <div className="app">

      {/* NAVBAR */}

      <div className="nav">

        <h2>Exam Helper AI 🚀</h2>

        <button onClick={upgradeToPro}>
          Upgrade Pro
        </button>

      </div>

      {/* MAIN */}

      <div className="container">

        {/* LEFT */}

        <div className="card">

          <h1>AI Study Assistant</h1>

          <p>
            Generate exam questions instantly from your notes.
          </p>

          <textarea
            name="notes"
            id="notes"
            placeholder="Paste your notes here..."
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
          />

          <button onClick={generateQuestions}>

            {
              loading
                ? "Generating..."
                : "Generate Questions"
            }

          </button>

        </div>

        {/* RIGHT */}

        <div className="card output">

          <h2>Generated Output</h2>

          <pre>{output}</pre>

        </div>

      </div>

    </div>
  )
}

export default App