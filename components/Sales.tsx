import { ProductWithPrice } from '../types';
import Pricing from '@/components/Pricing';
import SalesHero from '@/components/SalesHero';

interface Props {
  products: ProductWithPrice[];
}

function Sales({ products }: Props){
  return(
    <div>
      <SalesHero></SalesHero>
      <a id="subscribe"></a>
      <Pricing products={products} />
    </div>
  )
}

export default Sales