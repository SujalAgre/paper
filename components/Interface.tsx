"use client"
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { useRef, useState, useEffect } from "react";
import SidebarIcon from '@/app/assets/icons/sidebar.svg'
import { Dispatch, SetStateAction } from 'react';

type chat = {
  role: "user" | "assistant" ;
  content: string | null;
}

type sidebar = {
  setSidebar: Dispatch<SetStateAction<boolean>>;
  sidebar: boolean
}

const Interface = ({ setSidebar, sidebar }: sidebar) => {
  const [input, setInput] = useState<string | null>(null);
  const [chat, setChat] = useState<chat[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [model, setModel] = useState<string>('llama-3.3-70b-versatile');

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
        model: model
      }),
    });

    setChat(prev => [...prev, newMessage])
    const data = await response.json()
    console.log(data)
    setChat(prev => [...prev, { role: "assistant", content: data.reply }])
  }

  return (
    <>
      <div className="w-full pt-2 flex items-center">
       {/* <SidebarIcon fill="#4B352A" className={`w-7 ml-3 cursor-pointer ${sidebar? "hidden" : ""}`} onClick={() => {
          setSidebar(true)
        }} /> */}

        <div className="w-full flex justify-between items-center bg-[#ffffff]">
          <a href="/" className="text-2xl font-bold ml-5 text-[#4B352A]">Paper</a>
          {/* <a href="" className="mr-5 text-[#948979] hover:text-[#756e61]">Login</a> */}
        </div>

      </div>

      <div className="h-[93vh] overflow-y-scroll flex flex-col items-center text-[#4B352A]">
        <div className="pt-10 pb-40">
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
            <div className="w-full h-[60vh] flex justify-center items-center text-3xl text-[#4B352A]">
              {currentMessage}
            </div>
          )}
        </div>


        <div className="bg-[#ffffff] flex justify-center items-center absolute bottom-0 pb-3">
          <div className={` bg-[#ffffff] flex flex-col border-1 border-[#948979] rounded-lg w-[700px] justify-evenly items-center`}>

            <div className={'w-full flex justify-between items-center'}>
                <textarea
                  ref={textareaRef}
                  className="ml-[2%] w-full resize-none mt-[25px] mb-[25px] overflow-auto max-h-[200px]"
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
            </div>
            <div className={'w-full flex justify-between mb-2'}>
              <select className={'ml-2'} value={model} onChange={function(e) { setModel(e.target.value); }}>
                <option value="llama-3.3-70b-versatile">llama-3.3-70b-versatile</option>
                <option value="llama-3.1-8b-instant">llama-3.1-8b-instant</option>
                <option value="gemma2-9b-it">gemma2-9b-it</option>
                             </select>
              <button onClick={askGPT} className="w-[35px] h-[35px] mr-2 bg-[#948979] hover:bg-[#867d6f] cursor-pointer text-[#ffffff] rounded-lg" disabled={!input}>↑</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Interface
