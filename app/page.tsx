"use client"
import { useState } from "react";

type chat = {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<chat[]>([
  ]);

  const API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const askGPT = async () => {
    setChat(prev => [...prev, { role: "user", content: input }])
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          ...chat,
          { role: "user", content: input }
        ]
      })
    })

    const data = await response.json()
    console.log(data)
    setChat(prev => [...prev, { role: "assistant", content: data.choices[0].message.content }])
  }

  return (
    <>
      <input
        type="text"
        className="border p-2 block mb-2"
        onChange={handleInput}
        value={input}
        placeholder="Ask something..."
      />

      <button onClick={askGPT}>enter</button>


      {chat.map((chatItem, index) => (
        <div key={index}>
          <p><strong>{chatItem.role}</strong></p>
          <p>{chatItem.content}</p>
        </div>
      ))}


    </>
  );
}
