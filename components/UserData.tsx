import { useEthers } from '@usedapp/core'

type Props = {
  username: string;
  roomHash: string;
}

function UserData({ username, roomHash }: Props){
  const { account } = useEthers()

  return (
    <>
      <h1 className="text">Username: <span className="font-bold">{username}</span></h1>
      <h1 className="text">Room ID: <span className="font-bold">{roomHash}</span></h1>
      <h1 className="text truncate">Public Address: <span className="font-bold">{account}</span></h1>
    </>
  )
}

export default UserData