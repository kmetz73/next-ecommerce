'use client';

import { Button } from '@/components/ui/button';
import { addItemToCart } from '@/lib/actions/cart.actions';
import { CartItem } from '@/types';
import { Plus, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();

  const handelAddToCart = async () => {
    const res = await addItemToCart(item);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    // Handel successful add to cart
    toast.custom((t) => (
      <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex items-center space-x-4">
        <span className=" text-gray-700">{res.message}</span>
        <Button
          onClick={() => {
            router.push('/cart'); // Navigate to cart page
            toast.dismiss(t.id); // Dismiss toast after clicking
          }}
          className="ml-auto bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
        >
          Add to Cart
        </Button>
      </div>
    ));
  };

  // Add item to cart logic here

  return (
    <Button className="w-full" type="button" onClick={handelAddToCart}>
      <PlusIcon />
      Go To Cart
    </Button>
  );
};

export default AddToCart;
