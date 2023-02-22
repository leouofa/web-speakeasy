type Props = {
  username: string;
}

function Username({ username }: Props){
  return (
    <>
      <h1 className="text-xl">username: <span className="font-bold">{username}</span></h1>
    </>
  )
}

export default Username