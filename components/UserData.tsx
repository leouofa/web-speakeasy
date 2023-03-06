import { useEthers } from '@usedapp/core'
import { FormEvent, MouseEvent } from 'react';

type Props = {
  username: string;
  roomHash: string;
  sharePublicAddress: boolean;
  handleExit: Function;
  handlePublicToggle: Function;
}

function UserData({ username, roomHash, sharePublicAddress, handleExit, handlePublicToggle }: Props){
  const { account } = useEthers()

  const exitRoom = (e: MouseEvent) => {
    e.preventDefault()
    handleExit()
  }

  const togglePublic = (e: MouseEvent) => {
    e.preventDefault()
    handlePublicToggle()
  }

  return (
      <div className="flex align-middle flex-col md:flex-row">
        <div>
          <h1 className="text">Username: <span className="font-bold">{username}</span></h1>
          <h1 className="text">Room ID: <span className="font-bold">{roomHash}</span></h1>
          <h1 className="text truncate">Public Address: <span className="font-bold">{account?.substring(1,20)}...</span></h1>
        </div>
        <div className="self-center mx-auto md:ml-auto mt-5 md:mt-0">
          <a href=""
             className="block lg:inline mr-4 mb-3 xl:mb-0 bg-transparent text-white
             w-full hover:bg-gray-700 border-gray-600 border-2
                focus:ring-0 focus:outline-none focus:ring-gray-100
                font-medium rounded-lg text-sm px-10 py-2.5
                text-center disabled:opacity-50 disabled:cursor-not-allowed"
             onClick={togglePublic}>
            {sharePublicAddress ? "Don't Share Public Address" : 'Share Address Public'}
          </a>
          <a href=""
             className="block lg:inline bg-gray-600 text-white
             w-full hover:bg-gray-700 border-gray-400 border-2
                focus:ring-4 focus:outline-none focus:ring-gray-800
                font-medium rounded-lg text-sm px-10 py-2.5
                text-center disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={exitRoom}>
            Exit Room
          </a>
        </div>
      </div>
  )
}

export default UserData