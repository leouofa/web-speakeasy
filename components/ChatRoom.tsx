import { useEffect, useState } from 'react';
import { clientPusher } from '../serverPusher';
import { Message } from '../typings';
import MessageComponent from 'components/MessageComponent';

function ChatRoom(){
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const channel = clientPusher.subscribe('messages');

    channel.bind('new-message', async (data: Message) => {
      if(messages?.find((message) => message.id === data.id )) return;

      setMessages([data, ...messages])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages, clientPusher])

  return (
    <div className="">
      <h1>Hello World</h1>{messages?.count}
      {(messages).map(message => (
        <MessageComponent message={message} key={message.id} />
      ))}
    </div>

  )
}

export default ChatRoom