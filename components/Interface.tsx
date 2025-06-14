"use client"
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { useRef, useState, useEffect, use } from "react";

type chat = {
  role: "user" | "assistant" | "system";
  content: string | null;
}

const Interface = () => {
  const [input, setInput] = useState<string | null>(null);
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

      <div className="h-screen overflow-y-scroll flex flex-col items-center text-[#4B352A]">
        <div className="absolute w-[99%] pt-3 flex justify-between items-center bg-[#ffffff]">
          <a href="/" className="text-2xl font-bold ml-5 text-[#4B352A]">Paper</a>
          <a href="" className="mr-5 text-[#948979] hover:text-[#756e61]">Login</a>
        </div>
        <div className="pt-12 pb-30 h-[100%]">
          {chat.length !== 0 ? (
            chat.map((chat, index) => {
              if (chat.role == "user") {
                return (
                  <div key={index} className="w-[700px] flex justify-end mb-5">
                    <div className="bg-[#f5f1ea] p-3 rounded-md max-w-[70%]">
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
            <div className="w-full h-full flex justify-center items-center text-3xl text-[#4B352A]">
              {currentMessage}
            </div>
          )}
        </div>


        <div className="bg-[#ffffff] flex justify-center items-center z-10 absolute bottom-0 pb-3">
          <div className={` bg-[#ffffff] flex border-1 border-[#948979] rounded-lg w-[700px] justify-between items-center`}>
            <textarea
              ref={textareaRef}
              className="ml-[2%] w-full resize-none mt-[30px] mb-[30px] overflow-auto max-h-[200px]"
              onChange={handleInput}
              value={input ? input : ''}
              placeholder="Ask something..."
              rows={1}
              onKeyDown={(e) => {
                if (e.key == "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  askGPT();
                }
              }}
            />
            <button onClick={askGPT} className="w-[38px] h-[35px] bg-[#948979] hover:bg-[#867d6f] cursor-pointer text-[#ffffff] rounded-lg mr-[3%]" disabled={!input}>↑</button>
          </div>
        </div>
      </div>



    </>
  );
}

export default Interface