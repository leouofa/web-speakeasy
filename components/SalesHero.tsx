import { MouseEvent } from 'react';

export default function SalesHero(){
  const scrollToSubscribe = (e: MouseEvent) => {
    e.preventDefault()
    const href = (e.target as HTMLInputElement).getAttribute('href')

    // @ts-ignore
    document.querySelector(href).scrollIntoView({
      behavior: 'smooth'
    });
  }

 return(
   <section className="bg-gradient-to-b from-zinc-800 to-zinc-900">
     <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-40 lg:grid-cols-12">
       <div className="mr-auto place-self-center lg:col-span-7">
         <h1
           className="text-white text-3xl font-extrabold sm:text-6xl mb-4 pb-2 drop-shadow-2xl"
         >
           Sidestep surveillance with a decentralized <span className="hidden lg:block"></span> chat app.
         </h1>
         <p className="max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl text-gray-400">
           Open source, MetaMask powered, business in a box that anyone can run and create a safe space for conversation inside their community.

         </p>
         <a href="#subscribe"
            onClick={scrollToSubscribe}
            className="inline-flex items-center justify-center px-5 py-3 mr-5 text-base
            font-medium text-center text-white rounded-lg
            drop-shadow-xl
            bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-900">
           Subscribe Now
           <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
             <path fillRule="evenodd"
                   d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                   clipRule="evenodd"></path>
           </svg>
         </a>
         <a href="https://github.com/leouofa/web-speakeasy" target="_blank"
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base
            font-medium text-center text-white rounded-lg
            drop-shadow-xl
            bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-900">
           View Source Code
           <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" fill="currentColor"
                width="24" height="24" viewBox="0 0 24 24">
             <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
           </svg>
         </a>
       </div>
       <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
         <img src="/screenshot.png" className="w-full ml-12 drop-shadow-xl grayscale" alt="mockup" />
       </div>
     </div>
   </section>
 )
}