// import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

import { TableCell, TableRow } from '@/components/ui/table';
import type { Sample } from '@prisma/client';
import { DialogEdit } from './sample-edit';
import { DialogDelete } from './sample-delete';
import { User } from 'next-auth';

export function Sample({ sample, user }: { sample: Sample; user: User }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{sample.name}</TableCell>
      <TableCell className="font-medium">{sample.description}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {sample.status}
        </Badge>
      </TableCell>
      <TableCell
        className="hidden md:table-cell"
        suppressHydrationWarning={true}
      >
        {sample.createdAt?.toLocaleString()}
      </TableCell>
      <TableCell className="flex gap-2">
        <DialogEdit
          sample={{
            id: sample.id,
            name: sample.name,
            description: sample.description || '',
            status: sample.status
          }}
          user={user}
        />
        <DialogDelete sample={sample} />
      </TableCell>
    </TableRow>
  );
}
