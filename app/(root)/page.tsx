import ProductList from '@/components/shared/product/Product-list';
import sampleData from '@/db/sample-data';

export const metadata = {
  title: 'Home',
};

const HomePage = () => {
  // console.log(sampleData);
  return (
    <>
      <ProductList
        data={sampleData.products}
        title="Newest Arrivals"
        limit={4}
      />
    </>
  );
};
export default HomePage;
