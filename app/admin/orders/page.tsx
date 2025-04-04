import { requireAdmin } from '@/lib/auth-guard';

const OrdersPage = async () => {
  await requireAdmin();

  return <div>OrdersPage</div>;
};
export default OrdersPage;
