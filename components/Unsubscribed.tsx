import { ProductWithPrice } from '../types';
import Pricing from '@/components/Pricing';

interface Props {
  products: ProductWithPrice[];
}

function Unsubscribed({ products }: Props){
  return(
    <div>
      <>Unsubscribed Page</>
      <Pricing products={products} />
    </div>
  )
}

export default Unsubscribed