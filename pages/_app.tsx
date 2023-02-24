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

import { ThirdwebWeb3Provider } from "@3rdweb/hooks"

export default function MyApp({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );
  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  const supportedChainIds = [80001, 4];

  const connectors = {
    injected: {},
  };

  return (
    <div className="bg-black">
      <ThirdwebWeb3Provider
        supportedChainIds={supportedChainIds}
        connectors={connectors}
      >
        <SessionContextProvider supabaseClient={supabaseClient}>
          <MyUserContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MyUserContextProvider>
        </SessionContextProvider>
      </ThirdwebWeb3Provider>
    </div>
  );
}
