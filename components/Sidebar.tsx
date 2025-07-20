import SidebarIcon from '@/app/assets/icons/Sidebar.svg'
import NewChatIcon from '@/app/assets/icons/new.svg'
import PurgeChatsIcon from '@/app/assets/icons/delete.svg'

import { Dispatch, SetStateAction } from 'react';

type chat = {
  id: string,
  title: string,
  createdAt: number,
  updatedAt: number,
  messages: message[],
  model: string
}

type message = {
  role: "user" | "assistant";
  content: string | null;
}

type Props = {
  setSidebar: Dispatch<SetStateAction<boolean>>
  setMessages: Dispatch<SetStateAction<message[]>>
  chatObject: chat[]
  setChatObject: Dispatch<SetStateAction<chat[]>>
  currentChatId: string | null;
  setCurrentChatId: Dispatch<SetStateaction<string | null>>;
};


const Sidebar = ({ setSidebar, chatObject, setChatObject, setMessages, currentChatId, setCurrentChatId }: Props) => {
  return (

    <div className="w-full h-full bg-[#f9f9f9] flex flex-col items-center">
      <div className='flex w-full pb-3'>
        <SidebarIcon fill="#4B352A" className="mt-3 w-7 ml-3 cursor-pointer" onClick={() => {
          setSidebar(false)
        }} />
      </div>
      <div className="w-full h-full flex flex-col items-center overflow-y-scroll scrollbar-thin scrollbar-track-{#fffff}">
        <div onClick={() => {
          setCurrentChatId(null)
          setMessages([])
        }} className="w-[93%] h-[6%] mt-4 flex text-sm items-center rounded-sm cursor-pointer hover:bg-[#efefef]">
          <NewChatIcon className="ml-[3%] mr-[3%] w-5" />
          New chat
        </div>

        <div onClick={() => {
          setChatObject([])
        }}
          className="w-[93%] h-[6%] mt-[3%] flex text-sm items-center rounded-sm cursor-pointer hover:bg-[#efefef]">
          <PurgeChatsIcon className="ml-[3%] mr-[3%] w-5" />
          Delete Chats
        </div>

        <div className={`w-58 mt-7 pl-[3%] text-[#8a8a8a] ${chatObject !== 0 ? 'flex' : 'hidden'}`}>
          Chats
        </div>

        {chatObject.map(chat => (
          <div key={chat.id} onClick={() => {
            setCurrentChatId(chat.id)
            setMessages(chat.messages)
          }} className="w-58 min-h-8.5 mt-2 pl-[3%] flex items-center rounded-sm cursor-pointer hover:bg-[#efefef]">
            {chat.title}
          </div>
        ))}
      </div>


    </div>
  )
}

export default Sidebar
