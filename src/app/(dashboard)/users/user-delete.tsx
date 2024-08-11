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
import { deleteUser } from './actions';
import type { User } from '@prisma/client';

interface DialogDeleteProps {
  user: User;
}

export function DialogDelete({ user }: DialogDeleteProps) {
  const [open, setOpen] = useState(false);
  const handleDialogOpen = () => {
    setOpen(false);
  };

  return (
    <Dialog key={'delete-sample-dialog'} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete user</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          Are you sure to delete {user.name} ?
        </div>
        <DialogFooter>
          <form action={deleteUser}>
            <input id="id" name="id" value={user.id} type="hidden" />
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
