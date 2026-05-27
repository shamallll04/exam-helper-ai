import { useState } from "react"

function App() {

  const [notes, setNotes] = useState("")
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)

  // =====================================
  // GENERATE QUESTIONS
  // =====================================

  async function generateQuestions() {

    try {

      setLoading(true)

      const res = await fetch(
        "http://localhost:5000/generate",
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
        data?.choices?.[0]?.message?.content
        || "No response"
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

      const res = await fetch(
        "http://localhost:5000/create-order",
        {
          method: "POST"
        }
      )

      const data = await res.json()

      const options = {

        key:
          "rzp_test_SuROd3WnfUli1d",

        amount:
          data.amount,

        currency:
          data.currency,

        name:
          "Exam Helper AI",

        description:
          "Pro Plan",

        order_id:
          data.id,

        handler: function (response) {

          alert(
            "Payment Successful 🚀"
          )

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

  // =====================================
  // UI
  // =====================================

  return (

    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "#0f172a",
        color: "white",
        fontFamily: "Arial"
      }}
    >

      <h1
        style={{
          fontSize: "42px",
          marginBottom: "10px"
        }}
      >
        Exam Helper AI 🚀
      </h1>

      <p
        style={{
          marginBottom: "30px",
          color: "#cbd5e1"
        }}
      >
        Generate exam questions from notes
      </p>

      <textarea
        name="notes"
        id="notes"
        value={notes}
        onChange={(e) =>
          setNotes(e.target.value)
        }

        placeholder="Paste your notes here..."

        style={{
          width: "100%",
          height: "220px",
          padding: "20px",
          borderRadius: "12px",
          border: "none",
          outline: "none",
          fontSize: "16px",
          marginBottom: "20px"
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "30px"
        }}
      >

        <button

          onClick={generateQuestions}

          style={{
            padding: "14px 24px",
            borderRadius: "10px",
            border: "none",
            background: "#7c3aed",
            color: "white",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >

          {
            loading
              ? "Generating..."
              : "Generate Questions"
          }

        </button>

        <button

          onClick={upgradeToPro}

          style={{
            padding: "14px 24px",
            borderRadius: "10px",
            border: "none",
            background: "#16a34a",
            color: "white",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >

          Upgrade to Pro 🚀

        </button>

      </div>

      <div
        style={{
          background: "#1e293b",
          padding: "25px",
          borderRadius: "12px",
          whiteSpace: "pre-wrap",
          lineHeight: "1.7"
        }}
      >

        {output}

      </div>

    </div>
  )
}

export default App