import { Message } from '../typings';

type Props = {
  message: Message
}

function MessageComponent({message}: Props){
  return (
    <>
      <h1>{message.id}</h1>
      <h1>{message.username}</h1>
      <h1>{message.message}</h1>
      <h1>{message.created_at}</h1>
      <hr />
    </>
  )

}

export default MessageComponent