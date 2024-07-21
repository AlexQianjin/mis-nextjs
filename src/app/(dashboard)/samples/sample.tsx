// import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { TableCell, TableRow } from '@/components/ui/table';
import type { Sample } from '@prisma/client';
import { deleteSample } from './actions';
import { DialogEdit } from './sample-edit';

function DialogDelete(sample: Sample) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete sample</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          Are you sure to delete {sample.name} ?
        </div>
        <DialogFooter>
          <form action={deleteSample}>
            <Button type="submit">Delete</Button>
          </form>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function Sample({ sample }: { sample: Sample }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{sample.name}</TableCell>
      <TableCell className="font-medium">{sample.description}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {sample.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {sample.createdAt?.toLocaleString()}
      </TableCell>
      <TableCell className="flex gap-2">
        {DialogEdit(sample)}
        {DialogDelete(sample)}
      </TableCell>
    </TableRow>
  );
}
