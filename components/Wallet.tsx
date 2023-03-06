import { useEthers, useEtherBalance } from '@usedapp/core'

function Wallet(){
  const { activateBrowserWallet, deactivate, account } = useEthers()

  return(
      <div>
        {!account && <button
          onClick={activateBrowserWallet}
          className="text-zinc-800 hover:text-white
          bg-white hover:bg-zinc-800
          border border-transparent hover:border-white
          focus:ring-4
          focus:outline-none
          focus:ring-gray-50
          focus:ring-opacity-50
          font-medium
          rounded-lg
          text-sm
          px-5 py-2.5
          text-center inline-flex items-center
          mr-2 mb-2"
        > Connect Wallet</button
        >}
        {account && <button
          onClick={deactivate}
          className="text-zinc-800 hover:text-white
          bg-white hover:bg-zinc-800
          border border-transparent hover:border-white
          focus:ring-4
          focus:outline-none
          focus:ring-gray-50
          focus:ring-opacity-50
          font-medium
          rounded-lg
          text-sm
          px-5 py-2.5
          text-center inline-flex items-center
          mr-2 mb-2"
        > Disconnect Wallet</button>}
      </div>
    )
}

export default Wallet