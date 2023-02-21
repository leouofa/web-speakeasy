function Gate(){
  return (
    <form className="w-full">
      <input type="text"
             className="shadow-sm
             bg-gray-50
             border
             border-gray-300
             text-gray-900
             text-sm text-black
             focus:ring-2 focus:ring-blue-600
             rounded-lg
             block w-full p-2.5 mb-2"
             placeholder="Enter The Passphrase ..." />
      <div className="flex justify-end">
        <button className="text-white w-1/2 bg-blue-700 hover:bg-blue-800
              focus:ring-4 focus:outline-none focus:ring-blue-300
              font-medium rounded-lg text-sm px-5 py-2.5
              text-center dark:bg-blue-600 dark:hover:bg-blue-700
              dark:focus:ring-blue-800" type="submit">Enter The Speakeasy</button>
      </div>
    </form>
  )
}

export default Gate