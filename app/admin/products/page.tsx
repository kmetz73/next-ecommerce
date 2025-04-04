import { requireAdmin } from '@/lib/auth-guard';

const ProductsPage = async () => {
  await requireAdmin();

  return <div>ProductsPage</div>;
};
export default ProductsPage;
