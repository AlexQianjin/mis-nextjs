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
import { deleteSample } from './actions';
import type { Sample } from '@prisma/client';

interface DialogDeleteProps {
  sample: Sample;
}

export function DialogDelete({ sample }: DialogDeleteProps) {
  const [open, setOpen] = useState(false);
  const handleDialogOpen = () => {
    console.log(25);
    setOpen(false);
  };

  return (
    <Dialog key={'delete-sample-dialog'} open={open} onOpenChange={setOpen}>
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
            <input
              id="id"
              name="id"
              value={sample.id}
              className="invisible"
              readOnly={true}
              title=''
              placeholder='sample id'
            />
            <Button type="submit" onClick={handleDialogOpen}>
              Delete
            </Button>
          </form>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
