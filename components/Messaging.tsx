import Gate from 'components/Gate';
import Username from 'components/Username';
import { useState } from 'react';

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

  return (
    <div className="mx-auto max-w-6xl">
      <div className="bg-gradient-to-bl bg-gray-900 mx-6 mb-10">
        <div className="flex justify-between align-center flex-row py-4 md:py-6 relative">
          <div className="flex flex-1 flex-col p-5">
            <Username username={username} />
          </div>
          <div className="flex flex-1 justify-end p-5">
            <Gate />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messaging