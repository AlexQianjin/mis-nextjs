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
import { PlusCircle } from 'lucide-react';
import type { Sample } from '@prisma/client';
import { editSample } from './actions';

export function DialogEdit(sample: Sample | null) {
  const title = sample == null ? 'Add sample' : 'Edit sample';
  return (
    <Dialog>
      <DialogTrigger asChild>
        {sample == null ? (
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              {title}
            </span>
          </Button>
        ) : (
          <Button variant="outline">{title}</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4"></div>
        <DialogFooter>
          <form action={editSample}>
            <Button type="submit">Save</Button>
          </form>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
