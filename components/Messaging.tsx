import Gate from 'components/Gate';
import UserData from 'components/UserData';
import { useState } from 'react';
import ChatInput from 'components/ChatInput';
import ChatRoom from 'components/ChatRoom';

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
  const [sharePublicAddress, setSharePublicAddress] = useState<boolean>(false)

  const { activateBrowserWallet, account } = useEthers()

  const updateRoomData = ({ roomName, digest}: RoomDataProps) => {
    setPassphrase(roomName);
    setRoomHash(digest.substring(0,20));
  }

  const handleExit = () => {
    setUsername(generate_username())
    setPassphrase('')
    setRoomHash('')
  }

  const handlePublicToggle = () => {
    setSharePublicAddress(!sharePublicAddress)
  }

  return (
    <>
      {(() => {
        if(!account) {
          return(
            <div className="mx-5 sm:mx-auto max-w-xl flex h-[80vh] sm:h-[calc(100vh-65px)] justify-center items-center">
              <div className="w-full bg-gray-900 rounded-2xl border-gray-700 border-2 p-20 sm:mt-[-30%] flex flex-col items-center">
                <h1 className="text-gray-100 text-center mb-6 text-2xl font-extralight">Wallet Not Connected</h1>
                <button
                  onClick={activateBrowserWallet}
                  className="text-white bg-gray-600 hover:bg-gray-700 border-gray-400 border-2
              focus:ring-4 focus:outline-none focus:ring-gray-800
              font-medium rounded-lg text-sm px-10 py-2.5
              text-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  Connect with Metamask
                </button>
              </div>
            </div>
          )
        }
      })()}

      {(() => {
        if(account && passphrase.length === 0) {
          return(
            <div className="mx-5 sm:mx-auto max-w-xl flex h-[80vh] md:h-[calc(100vh-65px)] justify-center items-center">
              <div className="w-full bg-gray-900 rounded-2xl border-gray-700 border-2 py-10 px-5 md:px-20 md:py-20 sm:mt-[-30%]">
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
              <div className="mx-auto max-w-6xl mt-5">
                <div className="bg-gradient-to-bl bg-gray-900 mx-6 mb-10 p-5 rounded-2xl border-2 border-gray-700">
                  <div className="flex flex-col align-center">
                    <UserData username={username} roomHash={roomHash} sharePublicAddress={sharePublicAddress} handleExit={handleExit} handlePublicToggle={handlePublicToggle} />
                  </div>
                </div>
              </div>

              <ChatRoom username={username} roomHash={roomHash} />
              <ChatInput username={username} channel={roomHash} sharePublicAddress={sharePublicAddress} />
            </>
          )
        }
      })()}
    </>
  )
}

export default Messaging