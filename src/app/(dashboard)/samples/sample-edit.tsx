'use client';
import { useState } from 'react';
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

interface DialogEditProps {
  sample?: Sample;
}

export function DialogEdit({ sample }: DialogEditProps) {
  const title = sample == null ? 'Add sample' : 'Edit sample';
  const [open, setOpen] = useState(false);
  const handleDialogOpen = () => {
    console.log(25);
    setOpen(false);
  };

  return (
    <Dialog key={'edit-sample-dialog'} open={open} onOpenChange={setOpen}>
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
        <form action={editSample}>
          <div className="grid gap-4 py-4"></div>
          <DialogFooter>
            <Button type="submit" onClick={handleDialogOpen}>
              Save
            </Button>
            {/* <Button type="submit">Save changes</Button> */}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
