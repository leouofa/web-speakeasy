import Gate from 'components/Gate';
import UserData from 'components/UserData';
import { useState } from 'react';
import ChatInput from 'components/ChatInput';
import ChatRoom from 'components/ChatRoom';
import Wallet from '@/components/Wallet';

import { useEthers, useEtherBalance } from '@usedapp/core'

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
  const [passphrase, setPassphrase] = useState<string>("");
  const [roomHash, setRoomHash] = useState<string>("");

  const { account } = useEthers()

  const updateRoomData = ({ roomName, digest}: RoomDataProps) => {
    setPassphrase(roomName);
    setRoomHash(digest.substring(0,20));
  }

  return (
    <>
      {(() => {
        if(!account) {
          return(
            <>
              <Wallet />
            </>
          )
        }
      })()}

      {(() => {
        if(account && passphrase.length === 0) {
          return(
            <div className="mx-auto max-w-xl flex h-[calc(100vh-65px)] justify-center items-center">
              <div className="w-full bg-gray-900 rounded-2xl border-gray-700 border-2 p-20 lg:mt-[-30%]">
                <Gate updateRoomData={updateRoomData} />
              </div>
            </div>
          )
        }
      })()}

      {(() => {
        if(roomHash.length > 0) {
          return(
            <>

              <div className="mx-auto max-w-6xl">
                <div className="bg-gradient-to-bl bg-gray-900 mx-6 mb-10 p-5">
                  <div className="flex flex-col align-center">
                    <UserData username={username} roomHash={roomHash} />
                  </div>
                </div>
              </div>

              <ChatRoom username={username} roomHash={roomHash} />
              <ChatInput username={username} channel={roomHash} />
            </>
          )
        }
      })()}
    </>
  )
}

export default Messaging