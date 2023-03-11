import {
  BuildingStorefrontIcon,
  CircleStackIcon,
  CodeBracketSquareIcon,
  IdentificationIcon,
  LockClosedIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

export default function FeaturesHero(){
  const features = [
    {
      name: 'Contact Free Chat',
      description: 'Enter a passcode and start chatting. The usernames are randomly generated for extra security.',
      icon: IdentificationIcon
    },
    {
      name: 'On-Device Encryption',
      description: 'Everything is encrypted on device. There are no blackboxes or private keys to steal.',
      icon: LockClosedIcon
    },
    {
      name: 'No Data Persistence',
      description: 'The chats are not stored anywhere, but rather pushed in real-time to all connected clients.',
      icon: CircleStackIcon
    },
    {
      name: 'Decentralized Identity',
      description: 'Securely share your public address without revealing your identity.',
      icon: UserCircleIcon
    },
    {
      name: 'Open-Source',
      description: 'Tiny code base means smaller attack vector and easily auditable code.',
      icon: CodeBracketSquareIcon
    },
    {
      name: 'Business in a Box',
      description: 'Clone the repo, signup for associated services, and run your own privacy serving businesses.',
      icon: BuildingStorefrontIcon
    },
  ]

 return(
   <section className="bg-gradient-to-b from-zinc-900 to-zinc-800 pb-10">
     <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-32 lg:px-6">
       <div className="max-w-screen-md mb-8 lg:mb-20 mx-auto">
         <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-50 md:text-center drop-shadow-2xl">
           Old school meets new school.
         </h2>
         <p className="sm:text-xl text-gray-400 md:text-center">Share a passcode code amongst your friends offline and start a secret conversation
           in a room that is resistant to both snooping and surveillance.</p>
       </div>
       <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
         { features.map((feature) =>{
           return (
             <div key={feature.name}>
               <div
                 className="hidden md:flex justify-center items-center mb-4 w-10 h-10 rounded-full lg:h-12 lg:w-12 bg-primary-900">
                 <feature.icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary-300" ></feature.icon>
               </div>
               <h3 className="mb-2 text-xl font-bold text-gray-50">{feature.name}</h3>
               <p className="text-gray-400">{feature.description}</p>
             </div>
           )
         })}
       </div>
     </div>
     <div className="mt-10 md:hidden border border-b-zinc-900 w-5/6 mx-auto"></div>
   </section>
 )
}