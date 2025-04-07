'use client';

import { productDefaultValues } from '@/lib/constants';
import { insertingProductSchema, updateProductSchema } from '@/lib/validators';
import { Product } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Toast } from 'react-hot-toast';
import { z } from 'zod';
import { Form } from '../ui/form';

const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: 'Create' | 'Update';
  product?: Product;
  productId?: number;
}) => {
  const router = useRouter();

  // another way to define the schema fro zodResolver
  // const schema =
  //   type === 'Update' ? updateProductSchema : insertingProductSchema;

  const form = useForm<z.infer<typeof insertingProductSchema>>({
    resolver: zodResolver(
      type === 'Create' ? insertingProductSchema : updateProductSchema
    ),
    defaultValues:
      product && type === 'Update' ? product : productDefaultValues,
  });

  return (
    <Form {...form}>
      <form className="space-y-8">
        <div className="flex flex-col md:flex-row gap-5">
          {/* Name field  */}
          {/* Slug field  */}
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          {/* Category field  */}
          {/* Brand field  */}
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          {/* Price field  */}
          {/* Stock field  */}
        </div>
        <div className="upload-field flex flex-col md:flex-row gap-5">
          {/* Images field  */}
        </div>
        <div className="upload-field">{/* isFeatured */}</div>
        <div>{/* Description */}</div>
        <div>{/* Submit Button */}</div>
      </form>
    </Form>
  );
};
export default ProductForm;
