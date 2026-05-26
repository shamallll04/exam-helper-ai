import axios from "axios"

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY

export async function generateQuestions(text) {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",

        messages: [
          {
            role: "user",
            content: `Generate important exam questions, viva questions and summary from:

${text}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "Exam Helper AI",
          "Content-Type": "application/json",
        },
      }
    )

    console.log(response.data)

    return response.data.choices[0].message.content

  } catch (error) {
    console.log(error.response?.data || error.message)

    return JSON.stringify(
      error.response?.data || error.message
    )
  }
}