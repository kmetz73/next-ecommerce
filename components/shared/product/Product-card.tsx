import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import ProductPrice from './Product-price';

const ProductCard = ({ product }: { product: any }) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0 items-center">
        <Link href={`/products/${product.slug}`}></Link>
        <Image
          src={product.images[0]}
          alt={product.name}
          width={300}
          height={300}
          priority={true}
        />
      </CardHeader>
      <CardContent className="p-4 gap-4">
        <div className="text-xs">{product.brand}</div>
        <Link href={`/products/${product.slug}`}>
          <h2 className="text-sm font-medium mt-2">{product.name}</h2>
        </Link>
        <div className="flex-between mt-2">
          <p>{product.rating} Stars</p>
          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <p className="text-destructive">Out Of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default ProductCard;
