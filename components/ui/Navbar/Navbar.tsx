import Link from 'next/link';
import s from './Navbar.module.css';

import { useRouter } from 'next/router';
import { useUser } from 'utils/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRef, useState } from 'react';

const Navbar = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef: any = useRef<HTMLDivElement>(null);

  const menuItems = [
    {
      name: 'Account',
      url: '/account',
    },
    {
      name: 'Sign Out',
      url: '/sign',
    },
  ]

  const toggleMenu = () => {
    if (isOpen) {
      menuRef.current.classList.add('hidden');
    } else {
      menuRef.current.classList.remove('hidden');
    }

    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className={s.root}>
        <a href="#skip" className="sr-only focus:not-sr-only">
          Skip to content
        </a>
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex justify-between align-center items-center flex-row py-4 md:py-4 h-16 relative drop-shadow-2xl">
            <div className="flex flex-1 items-center">
              <Link href="/">
                <a className={s.logo} aria-label="Logo">
                  <span className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text font-bold text-transparent font-extrabold">WEB
                    <span className=""> | SPEAKEASY</span>
                  </span>
                </a>
              </Link>
            </div>

            <div className="flex flex-1 justify-end space-x-8">
              {user ? (
                <>
                  <Link href="/account">
                    <a className="hidden md:block :inline-flex items-center leading-6 font-medium transition
                    ease-in-out px-4 py-2 rounded-xl underline">
                      Account</a>
                  </Link>
                  <span
                    className="hidden md:block inline-flex items-center leading-6 font-medium transition
                      ease-in-out border-2 border-gray-300 px-4 py-2 rounded-xl cursor-pointer"
                    onClick={async () => {
                      await supabaseClient.auth.signOut();
                      router.push('/signin');
                    }}
                  >
                    Sign out
                  </span>
                  <button data-collapse-toggle="mobile-menu" type="button"
                          onClick={toggleMenu}
                          className={`inline-flex items-center p-2 ml-1 text-sm 
                                  rounded-lg lg:hidden 
                                  text-gray-500 hover:bg-zinc-900 focus:ring-zinc-800
                                  focus:outline-none focus:ring-1`}
                          aria-controls="mobile-menu" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className={`${isOpen ? 'hidden' : ''} w-6 h-6`} fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"></path>
                    </svg>
                    <svg className={`${isOpen ? '' : 'hidden'} w-6 h-6`} fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"></path>
                    </svg>
                  </button>
                </>
              ) : (
                <Link href="/signin">
                  <a className={s.link}>Sign in</a>
                </Link>
              )}
            </div>
          </div>


        </div>
      </nav>
      <div className="fixed top-[calc(3rem+15px)] hidden w-full" ref={menuRef} id="mobile-menu">
        <div className="justify-between items-center w-full border-4 border-zinc-700 rounded drop-shadow-2xl">
          <ul className="flex flex-col mx-auto font-medium lg:flex-row lg:space-x-8 lg:mt-w0">
            {menuItems.map( (item, index) => (
              <li onClick={toggleMenu} key={item.name} className="border-b border-b-zinc-500 last:border-b-0">
                <Link href={item.url}><a className="block py-4 pr-4 pl-3
                                              bg-zinc-900
                                              text-gray-300
                                              border-zinc-700
                                              hover:bg-zinc-700

                                              ">{item.name}</a></Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
  </>
  );
};

export default Navbar;
