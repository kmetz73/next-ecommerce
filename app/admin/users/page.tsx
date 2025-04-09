import { Metadata } from 'next';
import { requireAdmin } from '@/lib/auth-guard';
import { deleteUser, getAllUsers } from '@/lib/actions/user.actions';
import Pagination from '@/components/shared/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DeleteDialog from '@/components/shared/delete-dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatId } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Admin Users',
};

const AdminUserPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  await requireAdmin();
  const { page = '1' } = await props.searchParams;
  const users = await getAllUsers({ page: Number(page) });

  return (
    <div className="space-y-2">
      <div className="flex-between">
        <h1 className="h2-bold">Users</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>NAME</TableHead>
            <TableHead>EMAIL</TableHead>
            <TableHead>ROLE</TableHead>
            <TableHead>ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{formatId(user.id)}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.role === 'user' ? (
                  <Badge variant="secondary">User</Badge>
                ) : (
                  <Badge variant="default">Admin</Badge>
                )}
              </TableCell>
              <TableCell className="flex gap-1">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/users/${user.id}`}>Edit</Link>
                </Button>
                <DeleteDialog id={user.id} action={deleteUser} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {users?.totalPages > 1 && (
        <Pagination page={page || 1} totalPages={users?.totalPages} />
      )}
    </div>
  );
};
export default AdminUserPage;
