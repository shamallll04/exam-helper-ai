import { useState } from "react"

function App() {

  const [notes, setNotes] = useState("")
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)

  // =========================
  // AI GENERATION
  // =========================
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
          body: JSON.stringify({ notes })
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

  // =========================
  // UPGRADE TO PRO (RAZORPAY)
  // =========================
  async function upgradeToPro() {

    try {

      const res = await fetch(
        "https://exam-helper-ai-1.onrender.com/create-order",
        {
          method: "POST"
        }
      )

      const data = await res.json()

      const options = {

        key: "YOUR_RAZORPAY_KEY_ID",

        amount: data.amount,
        currency: data.currency,
        name: "Exam Helper AI",
        description: "Pro Plan",
        order_id: data.id,

        handler: function (response) {
          alert("Payment Successful 🚀")
          console.log(response)
        },

        theme: {
          color: "#7c3aed"
        }
      }

      const razorpay =
        new window.Razorpay(options)

      razorpay.open()

    } catch (error) {

      console.log(error)
      alert("Payment failed")
    }
  }

  return (

    <div style={{
      minHeight: "100vh",
      padding: "40px",
      background: "#0f172a",
      color: "white",
      fontFamily: "Arial"
    }}>

      <h1>Exam Helper AI 🚀</h1>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Enter your notes..."
        style={{
          width: "100%",
          height: "200px",
          marginTop: "20px"
        }}
      />

      <br />

      <button onClick={generateQuestions}>
        {loading ? "Generating..." : "Generate"}
      </button>

      <button onClick={upgradeToPro}>
        Upgrade to Pro 🚀
      </button>

      <pre style={{ marginTop: "20px" }}>
        {output}
      </pre>

    </div>
  )
}

export default App