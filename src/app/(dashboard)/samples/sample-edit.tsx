'use client';
import { useState } from 'react';
import { useFormState } from 'react-dom';
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
import type { Sample } from './SampleSchema';
import { editSample } from './actions';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SampleSchema } from './SampleSchema';
import { SampleStatus } from '@prisma/client';

interface DialogEditProps {
  sample?: Sample;
}

const defaultSample: Sample = {
  name: '',
  description: '',
  status: SampleStatus.LOGGED
};

export function DialogEdit({ sample }: DialogEditProps) {
  const title = sample == null ? 'Add sample' : 'Edit sample';
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [state, formAction] = useFormState(editSample, null);

  const form = useForm<Sample>({
    mode: 'onBlur',
    resolver: zodResolver(SampleSchema),
    defaultValues: sample == null ? { ...defaultSample } : { ...sample }
  });

  const handleDialogOpen = () => {
    console.log(25);
    setOpen(false);
  };

  async function onSubmit() {
    // setMessage('')
    // setErrors({})
    /* No need to validate here because 
    react-hook-form already validates with 
    our Zod schema */
    await formAction(form.getValues());
    if (state?.errors) {
      // setMessage(result.message)
      // setErrors(result.errors)
      return;
    } else {
      // setMessage(result.message)
      router.refresh(); // could grab a new timestamp from db
      // reset dirty fields
      form.reset(form.getValues());
    }
  }

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
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(onSubmit)();
            }}
          >
            <div className="grid gap-4 py-4"></div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleDialogOpen}
              >
                Save
              </Button>
              {/* <Button type="submit">Save changes</Button> */}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
