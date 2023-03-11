import 'styles/main.css';
import 'styles/chrome-bug.css';
import { useEffect, useState } from 'react';
import React from 'react';

import Layout from 'components/Layout';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { AppProps } from 'next/app';
import { MyUserContextProvider } from 'utils/useUser';
import type { Database } from 'types_db';
import { DAppProvider } from '@usedapp/core';



export default function MyApp({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );
  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  return (
    <div className="">
      <DAppProvider config={{}}>
        <SessionContextProvider supabaseClient={supabaseClient}>
          <MyUserContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <script defer data-domain="webspeakeasy.com" src="https://plausible.io/js/script.js"></script>
          </MyUserContextProvider>
        </SessionContextProvider>
      </DAppProvider>
    </div>
  );
}
