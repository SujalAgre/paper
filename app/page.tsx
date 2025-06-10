"use client"
import ChatHistory from "@/components/ChatHistory";
import { useState } from "react";

type chat = {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<chat[]>([
  ]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const askGPT = async () => {

    setChat(prev => [...prev, { role: "user", content: input }])

    const response = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat: [...chat, { role: "user", content: input }],
      }),
    });

    const data = await response.json()
    console.log(data)
    setChat(prev => [...prev, { role: "assistant", content: data.reply }])
  }

  return (
    <>
      <ChatHistory chat={chat} />
      <div className="w-screen flex justify-center">
        <input
          type="text"
          className="h-[7vh] border-1 w-[40vw] pl-2"
          onChange={handleInput}
          value={input}
          placeholder="Ask something..."
        />
        <button onClick={askGPT} className="w-[10vw] border-1">enter</button>
      </div>

    </>
  );
}
