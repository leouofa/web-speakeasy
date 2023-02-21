import Pricing from 'components/Pricing';
import { getActiveProductsWithPrices } from 'utils/supabase-client';
import { Product } from 'types';
import { GetStaticPropsResult } from 'next';
import { useUser } from 'utils/useUser';
import Messaging from 'components/Messaging';

interface Props {
  products: Product[];
}

export default function PricingPage({ products }: Props) {
  const { user } = useUser();

  return (
    <>
      <Pricing products={products} />
    </>
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
