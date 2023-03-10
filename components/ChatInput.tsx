"use client"

import {FormEvent, useState} from "react";
import {v4 as uuid} from 'uuid';
import {Message} from "../typings";
import { useEthers } from '@usedapp/core';

type Props = {
  username: string;
  channel: string;
  sharePublicAddress: boolean;
}

function ChatInput({ username, channel, sharePublicAddress }: Props){
  const [input, setInput] = useState("");
  const { account } = useEthers()

  const addMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input) return;

    const messageToSend = input;

    setInput('');


    const id = uuid();
    const public_address = (sharePublicAddress ? account : '');

    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: username,
      channel: channel,
      public_address: public_address!
    }

    const uploadMessage = async () => {
      const res = await fetch('/api/addMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message
        }),
      });

      const data = await res.json();
    }

    uploadMessage()
  }

  return (
    <div className="fixed bottom-0 z-50 w-full bg-gradient-to-b from-black to-[rgba(255,255,255,0.02)]">
      <form onSubmit={addMessage} className="mx-auto max-w-7xl flex px-4 pt-5 pb-4 h-20 space-x-0 border-t border-gray-900">
        <input type="text"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="Enter a message ..."
               className="flex-1 rounded-l text-black focus:outline-none focus:ring-0
                   focus:ring-gray-400 focus:border-transparent px-5 py-3
                   disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button type="submit"
                disabled={!input}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold
                border-gray-400 border-0
                py-2 px-4 rounded-r disabled:opacity-50
                disabled:cursor-not-allowed h-[43px]">
          <svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
          </svg>
          <span className="sr-only">Send message</span>
        </button>
      </form>
    </div>
  )
}

export default ChatInput