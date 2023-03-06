import { Message } from '../typings';
import { useUser } from '@/utils/useUser';

type Props = {
  message: Message;
  username: string;
}

function MessageComponent({message, username}: Props){
  const isUser = message.username === username;

  const hasPublicAddress = () => {
    if(message.public_address.length > 0) return true

    return false
  }

  return (
    <div className={`flex w-fit ${!isUser && "ml-auto"}`}>
      <div>
        <p className={`text-[0.65rem] px-[2px] pb-[2px] 
                    ${(isUser ? 'text-green-400 text-left' : 'text-blue-400 text-right')}`}>
          <span>{message.username}</span>
          <span className="block font-bold">{message.public_address}</span>
        </p>

        <div className="flex items-end">
          <div className={`px-3 py-2 rounded-lg w-fit text-white
                        ${(isUser ? 'bg-green-700' : 'bg-blue-700 ml-auto order-2')}`}>
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