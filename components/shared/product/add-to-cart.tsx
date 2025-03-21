'use client';

import { Button } from '@/components/ui/button';
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import { Cart, CartItem } from '@/types';
import { PlusIcon, Minus, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import toast from 'react-hot-toast';

const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handelAddToCart = async () => {
    startTransition(async () => {
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
    });
  };

  // Handle Remove from cart
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      toast(res.message, {
        style: res.success
          ? {} // Default style (react-hot-toast uses this automatically)
          : { background: 'red', color: 'white' }, // Custom destructive style
      });
      return;
    });
  };

  // Check if item in cart
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div>
      <Button type="button" variant="outline" onClick={handleRemoveFromCart}>
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Minus className="h-4 w-4" />
        )}
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button type="button" variant="outline" onClick={handelAddToCart}>
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <PlusIcon className="h-4 w-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handelAddToCart}>
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <PlusIcon className="h-4 w-4" />
      )}
      Add To Cart
    </Button>
  );
};

export default AddToCart;
