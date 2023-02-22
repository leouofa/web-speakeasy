type Props = {
  username: string;
  roomHash: string;
}

function UserData({ username, roomHash }: Props){
  return (
    <>
      <h1 className="text">Username: <span className="font-bold">{username}</span></h1>
      <h1 className="text">Room ID: <span className="font-bold">{roomHash}</span></h1>
    </>
  )
}

export default UserData