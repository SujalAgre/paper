"use client"
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { useRef, useState, useEffect } from "react";
import SidebarIcon from '@/app/assets/icons/Sidebar.svg'
import { Dispatch, SetStateAction } from 'react';
import { v4 as uuidv4 } from 'uuid';

type message = {
  role: "user" | "assistant" ;
  content: string | null;
}

type chat = {
  id: string,
  title: string,
  createdAt: number,
  updatedAt: number,
  messages: message[],
  model: string
}

type Props = {
  setSidebar: Dispatch<SetStateAction<boolean>>;
  sidebar: boolean
  chatObject: chat[];
  setChatObject: Dispatch<SetStateAction<chat[]>>;
  messages: message[];
  setMessages: Dispatch<SetStateAction<message[]>>
  currentChatId: string | null;
  setCurrentChatId: Dispatch<SetStateaction<string | null>>;
}

const Interface = ({ setSidebar, sidebar, chatObject, setChatObject, messages, setMessages, currentChatId, setCurrentChatId }: Props) => {
  const [input, setInput] = useState<string | null>(null);
  const [displayText, setDisplayText] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [model, setModel] = useState<string>('llama-3.3-70b-versatile');

  const startupMessages = ["Hmmmmmmmm..", "What's brewing upstairs?", 'print("welcome")', "Awesome", "btw i like playing minecraft", "Yayy!", "Yessir!", "Damn!"]

  useEffect(() => {
    setDisplayText(startupMessages[randomMessage()]);
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
    const newMessage: message = { role: "user", content: input }
    const updatedMessages = [...messages, newMessage];

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
        chat: updatedMessages,
        model: model
      }),
    });

    const data = await response.json()

    const assistantMessage: message = { role: "assistant", content: data.reply };

    const finalMessages = [...updatedMessages, assistantMessage]; // Complete conversation

    setMessages(finalMessages);


    if(currentChatId){
      setChatObject(prevChat => prevChat.map(chat => chat.id === currentChatId ? {
        ...chat,
        messages: finalMessages,
        updatedAt: Date.now(),
        title: chat.title
      }:chat
      ))
    } else {
      const newChatId = uuidv4()
      const newChat: chat = {
      id: newChatId,
      title: input,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: finalMessages,
      model: model
    }

      setChatObject(prev => [...prev, newChat]);
      setCurrentChatId(newChatId);
    }
    console.log(chatObject)
  }

  return (
    <>
      <div className="w-full pt-2 flex items-center">
       <SidebarIcon fill="#4B352A" className={`w-7 ml-3 cursor-pointer ${sidebar? "hidden" : ""}`} onClick={() => {
          setSidebar(true)
        }} />

        <div className="w-full flex justify-between items-center bg-[#ffffff]">
          <a href="/" className="text-2xl font-bold ml-5 text-black">Paper</a>
          {/* <a href="" className="mr-5 text-[#948979] hover:text-[#756e61]">Login</a> */}
        </div>

      </div>

      <div className="h-[93vh] overflow-y-scroll flex flex-col items-center text-[#4B352A]">
        <div className="pt-10 pb-40">
          {messages.length !== 0 ? (
            messages.map((messages, index) => {
              if (messages.role == "user") {
                return (
                  <div key={index} className="w-[700px] flex justify-end mb-5">
                    <div className="bg-[#f5f1ea] p-3 rounded-md max-w-[70%]">
                      <p>{messages.content}</p>
                    </div>
                  </div>
                )
              } else if (messages.role == "assistant") {
                return (
                  <div key={index} className="w-[700px]">
                    <MarkdownRenderer content={messages.content} />
                  </div>
                );
              }
            })
          ) : (
            <div className="w-full h-[60vh] flex justify-center items-center text-3xl text-black">
              {displayText}
            </div>
          )}
        </div>


        <div className="bg-[#ffffff] flex justify-center items-center absolute bottom-0 pb-3">
          <div className={` bg-[#ffffff] flex flex-col border-1 border-[#b3b3b3] rounded-lg w-[700px] justify-evenly items-center`}>

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
              <button onClick={askGPT} className="w-[35px] h-[35px] mr-2 bg-[#ededed] hover:bg-[#e0e0e0] cursor-pointer text-[535353] rounded-lg" disabled={!input}>↑</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Interface
