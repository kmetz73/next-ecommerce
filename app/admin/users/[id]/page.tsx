import { getUserById } from '@/lib/actions/user.actions';
import { requireAdmin } from '@/lib/auth-guard';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Update User',
};

const AdminUserUpdatePage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await props.params;

  await requireAdmin();

  const user = await getUserById(id);

  if (!user) notFound();

  return (
    <div className="space-y-8 max-w-lg mx-auto">
      <h1 className="h2-bold">Update User</h1>
    </div>
  );
};
export default AdminUserUpdatePage;
