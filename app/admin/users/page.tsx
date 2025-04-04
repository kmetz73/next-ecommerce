import { requireAdmin } from '@/lib/auth-guard';

const UsersPage = async () => {
  await requireAdmin();

  return <div>UsersPage</div>;
};
export default UsersPage;
