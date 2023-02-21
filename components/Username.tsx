type Props = {
  username: string;
}

function Username({ username }: Props){
  return (
    <>
      <h1 className="text-xl">username: <span className="font-bold">{username}</span></h1>
      <p className="text-sm">The username is assigned automatically, and will change every time you refresh the browser.</p>
    </>
  )
}

export default Username