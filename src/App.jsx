import { useState } from "react"

function App() {

  const [notes, setNotes] = useState("")
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)

  const [language, setLanguage] =
    useState("Malayalam")

  // =====================================
  // GENERATE SIMPLE NOTES
  // =====================================

  async function generateExplanation() {

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
            notes,
            language
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
  // RAZORPAY
  // =====================================

  async function upgradeToPro() {

    try {

      const response = await fetch(

        "https://exam-helper-ai-1.onrender.com/create-order",

        {
          method: "POST"
        }
      )

      const order =
        await response.json()

      if (!order.id) {

        alert("Order failed")

        return
      }

      const options = {

        key: "rzp_test_SvDBRnjMycTk4g",

        amount: order.amount,

        currency: order.currency,

        name: "StudyEasy AI",

        description:
          "Pro Upgrade",

        order_id: order.id,

        handler: function () {

          alert(
            "Payment Successful 🚀"
          )
        },

        theme: {
          color: "#6366f1"
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

    <div className="app">

      {/* NAVBAR */}

      <div className="nav">

        <h2>StudyEasy AI 🚀</h2>

        <button
          onClick={upgradeToPro}
        >
          Upgrade Pro
        </button>

      </div>

      {/* MAIN */}

      <div className="container">

        {/* INPUT */}

        <div className="card">

          <h1>
            AI Study Simplifier
          </h1>

          <p>
            Convert difficult study
            notes into easy mother
            tongue explanations.
          </p>

          {/* LANGUAGE */}

          <select
            value={language}

            onChange={(e) =>
              setLanguage(
                e.target.value
              )
            }
          >

            <option>
              Malayalam
            </option>

            <option>
              Hindi
            </option>

            <option>
              Tamil
            </option>

            <option>
              Kannada
            </option>

            <option>
              English
            </option>

          </select>

          {/* NOTES */}

          <textarea

            id="notes"

            name="notes"

            placeholder=
              "Paste your notes here..."

            value={notes}

            onChange={(e) =>
              setNotes(
                e.target.value
              )
            }
          />

          {/* BUTTON */}

          <button
            onClick={
              generateExplanation
            }
          >

            {
              loading
                ? "Generating..."
                : "Simplify Notes"
            }

          </button>

        </div>

        {/* OUTPUT */}

        <div className="card output">

          <h2>
            Simplified Notes
          </h2>

          <pre>{output}</pre>

        </div>

      </div>

    </div>
  )
}

export default App