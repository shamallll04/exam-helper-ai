import { useState } from "react"

function App() {

  const [notes, setNotes] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  // =====================================
  // AI GENERATE
  // =====================================

  const generateNotes = async () => {

    if (!notes) {
      alert("Please enter notes")
      return
    }

    try {

      setLoading(true)

      const response = await fetch(
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

      const data = await response.json()

      setResult(
        data.choices?.[0]?.message?.content
      )

      setLoading(false)

    } catch (error) {

      console.log(error)

      alert("Generation failed")

      setLoading(false)
    }
  }

  // =====================================
  // PAYMENT
  // =====================================

  const handlePayment = async () => {

    try {

      const response = await fetch(
        "https://exam-helper-ai-1.onrender.com/create-order",
        {
          method: "POST"
        }
      )

      const order = await response.json()

      const options = {

        key: "rzp_test_SvDBRnjMycTk4g",

        amount: order.amount,

        currency: order.currency,

        name: "StudyEasy AI",

        description:
          "Upgrade to Pro",

        order_id: order.id,

        handler: function () {

          alert(
            "Payment Successful!"
          )
        },

        theme: {
          color: "#6366f1"
        }
      }

      const rzp =
        new window.Razorpay(options)

      rzp.open()

    } catch (error) {

      console.log(error)

      alert("Payment failed")
    }
  }

  return (

    <div
      style={{
        fontFamily: "Arial",
        background:
          "#f4f7ff",
        minHeight: "100vh"
      }}
    >

      {/* HERO */}

      <div
        style={{
          padding: "60px 20px",
          textAlign: "center",
          background:
            "linear-gradient(to right,#6366f1,#8b5cf6)",
          color: "white"
        }}
      >

        <h1
          style={{
            fontSize: "50px",
            marginBottom: "20px"
          }}
        >
          StudyEasy AI 🚀
        </h1>

        <p
          style={{
            fontSize: "22px",
            maxWidth: "700px",
            margin: "auto"
          }}
        >
          AI-powered study explanations
          in your own language.
        </p>

      </div>

      {/* FEATURES */}

      <div
        style={{
          padding: "50px 20px"
        }}
      >

        <h2
          style={{
            textAlign: "center",
            marginBottom: "40px"
          }}
        >
          Features
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px"
          }}
        >

          <div style={cardStyle}>
            <h3>
              📘 Simple Explanations
            </h3>

            <p>
              Understand difficult
              topics easily.
            </p>
          </div>

          <div style={cardStyle}>
            <h3>
              🌍 Mother Tongue Support
            </h3>

            <p>
              Learn in Malayalam,
              Hindi, Tamil and more.
            </p>
          </div>

          <div style={cardStyle}>
            <h3>
              ⚡ AI Powered
            </h3>

            <p>
              Fast intelligent
              explanations instantly.
            </p>
          </div>

        </div>
      </div>

      {/* GENERATOR */}

      <div
        style={{
          padding: "20px",
          maxWidth: "900px",
          margin: "auto"
        }}
      >

        <h2>
          Generate Explanation
        </h2>

        <textarea
          rows="10"
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }

          placeholder="Paste your notes here..."

          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            border:
              "1px solid #ccc",
            marginTop: "20px"
          }}
        />

        <button

          onClick={generateNotes}

          style={buttonStyle}
        >

          {
            loading
              ? "Generating..."
              : "Generate"
          }

        </button>

        {

          result && (

            <div style={resultStyle}>

              <h3>
                Output
              </h3>

              <p>
                {result}
              </p>

            </div>
          )
        }

      </div>

      {/* PRICING */}

      <div
        style={{
          padding: "50px 20px",
          textAlign: "center"
        }}
      >

        <h2>
          Pricing
        </h2>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center"
          }}
        >

          <div style={priceCard}>

            <h3>
              Pro Plan
            </h3>

            <h1>
              ₹99/month
            </h1>

            <p>
              Unlimited explanations
            </p>

            <p>
              Faster AI responses
            </p>

            <p>
              Better quality outputs
            </p>

            <button
              onClick={handlePayment}
              style={buttonStyle}
            >
              Upgrade Now
            </button>

          </div>

        </div>

      </div>

      {/* FOOTER */}

      <div
        style={{
          background: "#111827",
          color: "white",
          textAlign: "center",
          padding: "30px"
        }}
      >

        <h3>
          StudyEasy AI
        </h3>

        <p>
          support@studyeasyai.com
        </p>

        <p>
          © 2026 StudyEasy AI
        </p>

      </div>

    </div>
  )
}

// =====================================
// STYLES
// =====================================

const cardStyle = {

  background: "white",

  padding: "30px",

  borderRadius: "15px",

  boxShadow:
    "0 4px 10px rgba(0,0,0,0.1)"
}

const buttonStyle = {

  marginTop: "20px",

  background: "#6366f1",

  color: "white",

  border: "none",

  padding:
    "15px 30px",

  borderRadius: "10px",

  cursor: "pointer",

  fontSize: "16px"
}

const resultStyle = {

  background: "white",

  padding: "20px",

  borderRadius: "10px",

  marginTop: "30px",

  boxShadow:
    "0 4px 10px rgba(0,0,0,0.1)"
}

const priceCard = {

  background: "white",

  padding: "40px",

  borderRadius: "20px",

  boxShadow:
    "0 4px 10px rgba(0,0,0,0.1)",

  width: "300px"
}

export default App