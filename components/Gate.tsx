import { FormEvent, useState } from 'react';

type Props = {
  updateRoomData: Function;
}

function Gate({ updateRoomData }: Props){

  const [input, setInput] = useState("");
  const enterRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input) return;

    const digested_message = digestMessage(input)

    digested_message.then((digest_hex) => {
      return (
        updateRoomData({
          roomName: input,
          digest: digest_hex
        })
      )
    })

    // setRoom(input);
  }

  async function digestMessage(message: string) {
    const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
  }

  return (
    <form onSubmit={enterRoom}>
      <input type="text"
             minLength={5}
             value={input}
             onChange={(e) => setInput(e.target.value)}
             className="shadow-sm
             bg-gray-50
             border
             border-gray-300
             text-gray-900
             text-sm text-black
             focus:ring-2 focus:ring-gray-600
             rounded-lg
             block w-full p-2.5 mb-3"
             placeholder="Enter The Passphrase ..." />
      <div className="flex justify-end">
        <button
          className="text-white w-full bg-gray-600 hover:bg-gray-700 border-gray-400 border-2
              focus:ring-4 focus:outline-none focus:ring-gray-800
              font-medium rounded-lg text-sm px-10 py-2.5
              text-center disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={!input}
                type="submit">
          Enter The Speakeasy
        </button>
      </div>
    </form>
  )
}

export default Gate