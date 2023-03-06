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
    <div className="fixed bottom-0 z-50 w-full bg-black">
      <form onSubmit={addMessage} className="mx-auto max-w-6xl flex px-10 pt-5 pb-10 space-x-2 border-t border-gray-900">
        <input type="text"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="Enter a message ..."
               className="flex-1 rounded border border-gray-300 text-black focus:outline-none focus:ring-2
                   focus:ring-blue-600 focus:border-transparent px-5 py-3
                   disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button type="submit"
                disabled={!input}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50
                disabled:cursor-not-allowed">
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatInput