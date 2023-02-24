import { useWeb3 } from "@3rdweb/hooks"
import { useEffect } from 'react';

function Metamask(){
  const { connectWallet, address, error } = useWeb3();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  

  return(
      <div className="w-full">
        {address}
        <button type="button"
                onClick={()=>connectWallet("injected")}
                className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2">
          Connect MetaMask
        </button>
      </div>
    )
}

export default Metamask