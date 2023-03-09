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
     <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-52 lg:grid-cols-12">
       <div className="mr-auto place-self-center lg:col-span-7">
         <h1
           className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-6xl mb-4 pb-2 drop-shadow-2xl"
         >
           Beat online surveillance with a our decentralized chat app.
         </h1>
         {/*<h1*/}
         {/*  className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-5xl text-white">Beat online surveillance with decentralized messaging platform.</h1>*/}
         <p className="max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl text-gray-400">
           Open source, MetaMask powered, business in a box that anyone can run and create a safe space for conversation inside their community.

         </p>
         <a href="#subscribe"
            onClick={scrollToSubscribe}
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base
            font-medium text-center text-white rounded-lg
            drop-shadow-2xl
            bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-900">
           Subscribe Now
           <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
             <path fillRule="evenodd"
                   d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                   clipRule="evenodd"></path>
           </svg>
         </a>
       </div>
       <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
         <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup" />
       </div>
     </div>
   </section>
 )
}