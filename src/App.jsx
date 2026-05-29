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
        background: "#eef2ff",
        minHeight: "100vh",
        color: "#111827"
      }}
    >

      {/* HERO */}

      <div
        style={{
          padding: "80px 20px",
          textAlign: "center",
          background:
            "linear-gradient(to right,#4f46e5,#7c3aed)",
          color: "white"
        }}
      >

        <h1
          style={{
            fontSize: "60px",
            marginBottom: "20px",
            fontWeight: "bold"
          }}
        >
          StudyEasy AI 🚀
        </h1>

        <p
          style={{
            fontSize: "24px",
            maxWidth: "700px",
            margin: "auto",
            lineHeight: "1.6"
          }}
        >
          AI-powered study explanations
          in your own language.
        </p>

      </div>

      {/* FEATURES */}

      <div
        style={{
          padding: "70px 20px"
        }}
      >

        <h2
          style={{
            textAlign: "center",
            marginBottom: "50px",
            color: "#111827",
            fontSize: "42px"
          }}
        >
          Features
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "25px"
          }}
        >

          <div style={cardStyle}>
            <h3>
              📘 Simple Explanations
            </h3>

            <p>
              Understand difficult
              topics easily with AI.
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

        <h2
          style={{
            color: "#111827",
            fontSize: "42px",
            marginBottom: "25px"
          }}
        >
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
            padding: "18px",
            borderRadius: "14px",
            border:
              "1px solid #cbd5e1",
            fontSize: "16px",
            outline: "none",
            boxSizing: "border-box"
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

              <p
                style={{
                  lineHeight: "1.8"
                }}
              >
                {result}
              </p>

            </div>
          )
        }

      </div>

      {/* PRICING */}

      <div
        style={{
          padding: "70px 20px",
          textAlign: "center"
        }}
      >

        <h2
          style={{
            color: "#111827",
            fontSize: "42px"
          }}
        >
          Pricing
        </h2>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center"
          }}
        >

          <div style={priceCard}>

            <h3>
              Pro Plan
            </h3>

            <h1
              style={{
                color: "#4f46e5"
              }}
            >
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
          padding: "40px"
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

  padding: "35px",

  borderRadius: "18px",

  boxShadow:
    "0 6px 15px rgba(0,0,0,0.08)",

  color: "#111827",

  transition: "0.3s"
}

const buttonStyle = {

  marginTop: "25px",

  background: "#4f46e5",

  color: "white",

  border: "none",

  padding:
    "15px 35px",

  borderRadius: "12px",

  cursor: "pointer",

  fontSize: "16px",

  fontWeight: "bold"
}

const resultStyle = {

  background: "white",

  padding: "25px",

  borderRadius: "15px",

  marginTop: "35px",

  boxShadow:
    "0 6px 15px rgba(0,0,0,0.08)"
}

const priceCard = {

  background: "white",

  padding: "45px",

  borderRadius: "22px",

  boxShadow:
    "0 6px 15px rgba(0,0,0,0.08)",

  width: "320px"
}

export default App