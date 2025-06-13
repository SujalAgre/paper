"use client"
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { useRef, useState, useEffect, use } from "react";

type chat = {
  role: "user" | "assistant";
  content: string;
}



export default function Home() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<chat[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const startupMessages = ["Hmmmmmmmm..", "What's brewing upstairs?", 'print("welcome")', "Awesome", "btw i like playing minecraft", "Yayy!", "Yessir!", "Damn!"]

  useEffect(() => {
    setCurrentMessage(startupMessages[randomMessage()]);
  }, []);

  const randomMessage = () => {
    return Math.floor(Math.random() * startupMessages.length)
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = textarea.scrollHeight + "px"; // Set to content height
    }
    setInput(e.target.value);
  };

  const askGPT = async () => {
    const newMessage: chat = { role: "user", content: input }
    setInput("");
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
    }

    const response = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat: [...chat, newMessage],
      }),
    });

    setChat(prev => [...prev, newMessage])
    const data = await response.json()
    console.log(data)
    setChat(prev => [...prev, { role: "assistant", content: data.reply }])
  }

  return (
    <>
      <div className="h-screen overflow-y-scroll flex flex-col items-center pt-10 pb-30  text-[#000000]">
        {chat.length !== 0 ? (
          chat.map((chat, index) => {
            if (chat.role == "user") {
              return (
                <div key={index} className="w-[700px] flex justify-end mb-5">
                  <div className="bg-[#f1f1f1] p-3 rounded-md max-w-[70%]">
                    <p>{chat.content}</p>
                  </div>
                </div>
              )
            } else if (chat.role == "assistant") {
              return (
                <div key={index} className="w-[700px]">
                  <MarkdownRenderer content={chat.content} />
                </div>
              );
            }
          })
        ) : (
          <div className="w-full h-full flex justify-center items-center text-3xl">
            {currentMessage}
          </div>
        )}

        <div className="bg-[#ffffff] flex justify-center items-center z-10 absolute bottom-0 pb-3">
          <div className={` bg-[#ffffff] flex border-1 border-gray-500 rounded-lg w-[700px] justify-between items-center`}>
            <textarea
              ref={textareaRef}
              className="ml-[2%] w-full resize-none mt-[30px] mb-[30px] overflow-auto max-h-[200px]"
              onChange={handleInput}
              value={input}
              placeholder="Ask something..."
              rows={1}
            />
            <button onClick={askGPT} className="w-[38px] h-[35px] bg-zinc-800 text-[#ffffff] rounded-lg mr-[3%]">↑</button>
          </div>
        </div>


      </div>


    </>
  );
}
