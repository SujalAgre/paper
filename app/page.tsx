"use client"
import Interface from "@/components/Interface";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { useEffect } from "react";
type message = {
  role: "user" | "assistant";
  content: string | null;
}

type chat = {
  id: string,
  title: string,
  createdAt: number,
  updatedAt: number,
  messages: [],
  model: string
}

export default function Home() {
  const [sidebar, setSidebar] = useState<boolean>(false);
  const [messages, setMessages] = useState<message[]>([]);
  const [chatObject, setChatObject] = useState<chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  useEffect(() => {
    const storedChatObject = JSON.parse(localStorage.getItem('chatObject')!)
    if (storedChatObject) {
      setChatObject(storedChatObject)
      console.log(chatObject)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('chatObject', JSON.stringify(chatObject))
  }, [chatObject])

  return (
    <>
      <div className="flex">
        {sidebar && <div className="border-r-1 h-screen w-80 border-[#d9d9d9]">
          <Sidebar setSidebar={setSidebar} chatObject={chatObject} setChatObject={setChatObject} setMessages={setMessages} currentChatId={currentChatId} setCurrentChatId={setCurrentChatId} />
        </div>}

        <div className="w-full">
          <Interface sidebar={sidebar} setSidebar={setSidebar} chatObject={chatObject} setChatObject={setChatObject} messages={messages} setMessages={setMessages} currentChatId={currentChatId} setCurrentChatId={setCurrentChatId} />
        </div>
      </div>

    </>
  );
}
