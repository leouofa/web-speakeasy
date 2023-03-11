import { useEffect, useRef, useState } from 'react';
import { clientPusher } from '../serverPusher';
import { Message } from '../typings';
import MessageComponent from 'components/MessageComponent';
import CryptoJS from 'crypto-js';

type Props = {
  username: string;
  digest: string;
  roomHash: string;
}

function ChatRoom({ username, digest, roomHash }: Props){
  const [messages, setMessages] = useState<Message[]>([]);
  const messageRef = useRef(messages)

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

  useEffect(() => { messageRef.current = messages}, [messages])

  useEffect(() => {
    if (!roomHash) return;

    const channel = clientPusher.subscribe(roomHash);

    channel.bind('new-message', async (data: Message) => {
      if( messageRef.current && messageRef.current.find((message) => message.id === data.id )) return;

      const decryptedMessage = decryptWithAES(data.message)
      data.message = decryptedMessage

      setMessages([...messageRef.current, data])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [])

  const handleScroll = (e:any) => {
    const treshHold = 150
    const bottom = e.target.scrollHeight - e.target.scrollTop < e.target.clientHeight + treshHold;
    if (bottom) {
      setBottomOfChat(true)
    } else {
      setBottomOfChat(false)
    }
  }

  const decryptWithAES = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, digest);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  };

  return (
    <div className="overflow-hidden ">
      <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto overflow-y-auto h-[calc(100vh-23rem-1.25rem)] lg:h-[calc(100vh-16rem-1.25rem)]"
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