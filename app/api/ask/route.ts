import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { chat } = body;

  console.log(req)

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: chat,
    }),
  });

  const data = await response.json();
  const reply = data?.choices?.[0]?.message?.content ?? "No reply";

  return NextResponse.json({ reply });
}
