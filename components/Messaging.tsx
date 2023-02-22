import Gate from 'components/Gate';
import Username from 'components/Username';
import { useState } from 'react';
import ChatInput from 'components/ChatInput';
import ChatRoom from 'components/ChatRoom';

function Messaging(){
  const generate_username = () => {

    return `patron-${getRandomInt(1, 100000)}`

    function getRandomInt(min:any, max:any) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }
  }

  const [username, setUsername] = useState(generate_username());
  const [room, setRoom] = useState<string>("");
  const [encryptedRoom, setEncryptedRoom] = useState<string>("");

  const updateRoomData = (roomName: string) => {
    setRoom(roomName);

    const digested_message = digestMessage(roomName)

    digested_message.then((digest_hex) => {
      setEncryptedRoom(digest_hex);
    })
  }

  async function digestMessage(message: string) {
    const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
  }

  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="bg-gradient-to-bl bg-gray-900 mx-6 mb-10">
          <div className="flex align-center flex-row">
            <div className="flex flex-1 flex-col p-5 bg-gray-800">
              <p className="text-sm text-gray-300 text-center">The passphrase is not saved and the username changes every the browser is refreshed.</p>
            </div>
          </div>
          <div className="flex justify-between align-center flex-row py-4 md:py-6 relative">
            <div className="flex flex-1 flex-col p-5">
              <Username username={username} />
            </div>
            <div className="flex flex-1 justify-end p-5">
              <h1>Room {room}</h1>
              <h1>Encrypted Room{encryptedRoom}</h1>
              <Gate setRoom={updateRoomData} />
            </div>
          </div>
        </div>
      </div>
      <ChatRoom encryptedRoom={encryptedRoom} />
      <ChatInput username={username} />
    </>
  )
}

export default Messaging