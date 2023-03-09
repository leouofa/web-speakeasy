import Link from 'next/link';
import s from './Navbar.module.css';

import { useRouter } from 'next/router';
import { useUser } from 'utils/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const Navbar = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex justify-between align-center items-center flex-row py-4 md:py-4 h-15 relative drop-shadow-2xl">
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
                  <a className={s.link}>Account</a>
                </Link>
                <span
                  className={s.link}
                  onClick={async () => {
                    await supabaseClient.auth.signOut();
                    router.push('/signin');
                  }}
                >
                  Sign out
                </span>
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
  );
};

export default Navbar;
