'use client';

import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';

const Notfound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Image
        src="/images/logo.svg"
        alt={`${APP_NAME} logo`}
        width={48}
        height={48}
        priority={true}
      />
      <div className="p-6 w-1/3 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Not Found</h1>
        <p className="text-destructive">
          Could not find the page you were looking for
        </p>
        <Button
          variant="outline"
          className="mt-4 px-2  "
          onClick={() => (window.location.href = '/')}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};
export default Notfound;
