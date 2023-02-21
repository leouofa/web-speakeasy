type Props = {
  username: string;
}

function Username({ username }: Props){
  return (
    <>
      <h1 className="text-xl">username: <span className="font-bold">{username}</span></h1>
      <p className="text-sm text-gray-300">The passphrase is not saved, the username is assigned automatically changes every the browser is refreshed.</p>
    </>
  )
}

export default Username