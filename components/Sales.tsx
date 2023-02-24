import { ProductWithPrice } from '../types';
import Pricing from '@/components/Pricing';

interface Props {
  products: ProductWithPrice[];
}

function Sales({ products }: Props){
  return(
    <div>
      <>Sales Page</>
      <Pricing products={products} />
    </div>
  )
}

export default Sales