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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { PlusCircle } from 'lucide-react';
import type { Sample } from './SampleSchema';
import { editSample } from './actions';
import { useForm } from 'react-hook-form';
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
      console.log(79, state);
      setOpen(false);
      router.refresh(); // could grab a new timestamp from db
      // reset dirty fields
      form.reset(form.getValues());
    }
  }

  const statusOptions: string[] = [
    'LOGGED',
    'PROCESSING',
    'FINISHED',
    'REPORTED',
    'FAILED'
  ];

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
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sample name</FormLabel>
                    <FormControl>
                      <Input placeholder="Sample name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sample status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statusOptions.map((statusOption) => (
                          <SelectItem key={statusOption} value={statusOption}>
                            {statusOption}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
