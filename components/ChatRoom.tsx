import { useEffect, useState } from 'react';
import { clientPusher } from '../serverPusher';
import { Message } from '../typings';
import MessageComponent from 'components/MessageComponent';

type Props = {
  roomHash: string;
}

function ChatRoom({ roomHash }: Props){
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!roomHash) return;

    const channel = clientPusher.subscribe(roomHash);

    channel.bind('new-message', async (data: Message) => {
      if(messages?.find((message) => message.id === data.id )) return;

      setMessages([data, ...messages])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages, roomHash, clientPusher])

  return (
    <div className="">
      {(messages).map(message => (
        <MessageComponent message={message} key={message.id} />
      ))}
    </div>

  )
}

export default ChatRoom