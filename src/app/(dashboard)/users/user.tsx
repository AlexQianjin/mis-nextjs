// import Image from 'next/image';
import { TableCell, TableRow } from '@/components/ui/table';
import type { User } from '@prisma/client';
import { DialogEdit } from './user-edit';
import { DialogDelete } from './user-delete';

export function User({ user }: { user: User }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{user.name}</TableCell>
      <TableCell className="font-medium">{user.email}</TableCell>
      <TableCell
        className="hidden md:table-cell"
        suppressHydrationWarning={true}
      >
        {user.createdAt?.toLocaleString()}
      </TableCell>
      <TableCell className="flex gap-2">
        <DialogEdit
          user={{
            id: user.id,
            name: user.name || '',
            email: user.email,
            password: ''
          }}
        />
        <DialogDelete user={user} />
      </TableCell>
    </TableRow>
  );
}
