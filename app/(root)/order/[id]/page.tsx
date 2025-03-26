import { Metadata } from 'next';
import { getOrderByID } from '@/lib/actions/order.actions';
import { notFound } from 'next/navigation';
import { ShippingAddress } from '@/types';

export const metadata: Metadata = {
  title: 'Order Details',
};

const OrderDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const order = await getOrderByID(id);
  if (!order) notFound();
  return <div>OrderIdPage </div>;
};
export default OrderDetailsPage;
