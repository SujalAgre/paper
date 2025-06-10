type chat = {
    role: "user" | "assistant";
    content: string;
};

type Props = {
    chat: chat[]
}

const ChatHistory = ({ chat }: Props) => {

    return (
        <div className=" h-[90vh] justify-center items-center flex flex-col overflow-scroll">
            {chat.map((chat, index) => (
                <div key={index} className="w-[50vw]">

                    <p><strong>{chat.role}</strong></p>
                    <p>{chat.content}</p>


                </div>

            ))}
        </div>
    )
}

export default ChatHistory