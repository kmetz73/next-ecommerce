import ProductList from '@/components/shared/product/Product-list';
import { getLatestProducts } from '@/lib/actions/product.actions';

export const metadata = {
  title: 'Home',
};

const HomePage = async () => {
  const latestProducts = await getLatestProducts();

  return (
    <>
      <ProductList data={latestProducts} title="Newest Arrivals" limit={4} />
    </>
  );
};
export default HomePage;
