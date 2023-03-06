import { useEthers } from '@usedapp/core'
import { FormEvent, MouseEvent } from 'react';

type Props = {
  username: string;
  roomHash: string;
  handleExit: Function;
}

function UserData({ username, roomHash, handleExit }: Props){
  const { account } = useEthers()

  const exitRoom = (e: MouseEvent) => {
    e.preventDefault()
    handleExit()
  }

  return (
    <div className="flex align-middle flex-col md:flex-row">
      <div>
        <h1 className="text">Username: <span className="font-bold">{username}</span></h1>
        <h1 className="text">Room ID: <span className="font-bold">{roomHash}</span></h1>
        <h1 className="text truncate">Public Address: <span className="font-bold">{account}</span></h1>
      </div>
      <div className="self-center ml-auto">
        <a href=""
           className="bg-gray-600 text-white
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