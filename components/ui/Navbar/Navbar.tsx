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
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex justify-between align-center flex-row py-4 md:py-6 relative">
          <div className="flex flex-1 items-center">
            <Link href="/">
              <a className={s.logo} aria-label="Logo">
                <span className="text-white font-bold">WEB
                  <span className="text-green-500">SPEAKEASY</span>
                  <span className="font-extralight">*</span>
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
