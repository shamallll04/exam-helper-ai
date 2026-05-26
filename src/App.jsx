import { useState } from "react"
import { generateQuestions } from "./gemini"
import jsPDF from "jspdf"

function App() {
  const [notes, setNotes] = useState("")
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleGenerate() {
    setLoading(true)

    try {
      const result = await generateQuestions(notes)
      setOutput(result)
    } catch (error) {
      console.log(error)
      setOutput("Error generating questions")
    }

    setLoading(false)
  }

  function downloadPDF() {
    const doc = new jsPDF()

    const splitText = doc.splitTextToSize(output, 180)
    doc.text(splitText, 10, 10)

    doc.save("exam-helper-ai.pdf")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">

      <h1 className="text-4xl font-bold mb-8">
        Exam Helper AI
      </h1>

      {/* INPUT */}
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Paste your notes here..."
        className="w-full max-w-2xl h-64 p-4 rounded-xl border"
      />

      {/* BUTTON */}
      <button
        onClick={handleGenerate}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        {loading ? "Generating..." : "Generate Questions"}
      </button>

      {/* OUTPUT */}
      {output && (
        <div className="w-full max-w-2xl bg-white mt-8 p-6 rounded-xl whitespace-pre-wrap">

          <div className="flex gap-4 mb-4">

            <button
              onClick={() => navigator.clipboard.writeText(output)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Copy Output
            </button>

            <button
              onClick={downloadPDF}
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Download PDF
            </button>

          </div>

          {output}
        </div>
      )}

    </div>
  )
}

export default App