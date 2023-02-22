import { Message } from '../typings';
import { useUser } from '@/utils/useUser';

type Props = {
  message: Message;
  username: string;
}

function MessageComponent({message, username}: Props){
  console.log(message.username, username)
  const isUser = message.username === username;

  return (
    <div className={`flex w-fit ${!isUser && "ml-auto"}`}>
      <div>
        <p className={`text-[0.65rem] px-[2px] pb-[2px] 
                    ${!isUser ? "text-blue-400 text-right" : "text-red-400 text-left"}`}>
          {message.username}
        </p>

        <div className="flex items-end">
          <div className={`px-3 py-2 rounded-lg w-fit text-white bg-red-400 
                        ${!isUser ? "bg-blue-400 ml-auto order-2" : "bg-red-400" }`}>
            <p>{message.message}</p>
          </div>
          <p className={`text-[0.65rem] italic px-2 text-gray-300 ${!isUser && 'text-right'}`}>
            {new Date(message.created_at).toLocaleDateString(navigator.language, {hour: '2-digit', minute:'2-digit'})}
          </p>
        </div>
      </div>
    </div>
  )

}

export default MessageComponent