import Pricing from 'components/Pricing';
import { getActiveProductsWithPrices } from 'utils/supabase-client';
import { Product } from 'types';
import { GetStaticPropsResult } from 'next';
import { useUser } from 'utils/useUser';
import Messaging from 'components/Messaging';
import Sales from 'components/Sales';
import { useEffect, useState } from 'react';

interface Props {
  products: Product[];
}

export default function IndexPage({ products }: Props) {
  const { user, assumeSubscribed } = useUser();
  const [ subscribed, setSubscribed ] = useState<boolean>(true);

  useEffect(()=>{
    if(!assumeSubscribed){
      setSubscribed(false)
    }

  },[assumeSubscribed, setSubscribed])

  return (
      <div>
        {(() => {
          if (user && subscribed) {
            return (
              <Messaging />
            )
          } else if (user && !subscribed) {
            return (
              <Pricing products={products} />
            )
          } else if (!user) {
            return (
              <Sales products={products} />
            )
          }
        })()}
      </div>
    )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const products = await getActiveProductsWithPrices();

  return {
    props: {
      products
    },
    revalidate: 60
  };
}
