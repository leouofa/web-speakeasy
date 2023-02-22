import Gate from 'components/Gate';
import Username from 'components/Username';
import { useState } from 'react';
import ChatInput from 'components/ChatInput';
import ChatRoom from 'components/ChatRoom';

type RoomDataProps = {
  roomName: string;
  digest: string;
}

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
  const [roomHash, setRoomHash] = useState<string>("");

  const updateRoomData = ({ roomName, digest}: RoomDataProps) => {
    setRoom(roomName);
    setRoomHash(digest);
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
              <h1>Encrypted Room{roomHash}</h1>
              <Gate updateRoomData={updateRoomData} />
            </div>
          </div>
        </div>
      </div>
      <ChatRoom encryptedRoom={roomHash} />
      <ChatInput username={username} />
    </>
  )
}

export default Messaging