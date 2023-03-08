import { useEffect, useRef, useState } from 'react';
import { clientPusher } from '../serverPusher';
import { Message } from '../typings';
import MessageComponent from 'components/MessageComponent';

type Props = {
  username: string;
  roomHash: string;
}

function ChatRoom({ username, roomHash }: Props){
  const [messages, setMessages] = useState<any[]>([]);
  const [bottomOfChat, _setBottomOfChat] = useState<boolean>(false)
  const bottomOfChatRef = useRef<any>(true)
  const messageEl = useRef<HTMLDivElement>(null)

  const setBottomOfChat = (val:boolean) => {
    bottomOfChatRef.current = val
    _setBottomOfChat(val);
  }


  useEffect(() =>{
    if (!roomHash) return;

    if (messageEl) {
      messageEl!.current!.addEventListener('DOMNodeInserted', event => {
        if(bottomOfChatRef.current){
          const { currentTarget: target } = event;
          (target as HTMLInputElement).scroll({ top: (target as HTMLInputElement).scrollHeight, behavior: 'smooth' });
        }
      });
    }
  }, [])

  useEffect(() => {
    if (!roomHash) return;

    const channel = clientPusher.subscribe(roomHash);

    channel.bind('new-message', async (data: Message) => {
      if(messages?.find((message) => message.id === data.id )) return;

      setMessages([...messages, data])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages, roomHash, clientPusher])

  const handleScroll = (e:any) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setBottomOfChat(true)
    } else {
      setBottomOfChat(false)
    }
  }

  return (
    <div className="overflow-hidden ">
      <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto overflow-y-auto h-[calc(100vh-10rem-2.5rem-2.5rem-1.25rem)]"
           onScroll={handleScroll}
           ref={messageEl}>
        {(messages).map(message => (
          <MessageComponent message={message} username={username} key={message.id} />
        ))}
      </div>
    </div>

  )
}

export default ChatRoom