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
import { Input } from '@/components/ui/input';
import { PlusCircle } from 'lucide-react';
import type { User } from './UserSchema';
import { editUser } from './actions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { UserSchema } from './UserSchema';

interface DialogEditProps {
  user?: User;
}

const defaultUser: User = {
  name: '',
  email: '',
  password: ''
};

export function DialogEdit({ user }: DialogEditProps) {
  const title = user == null ? 'Add user' : 'Edit user';
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [state, formAction] = useFormState(editUser, null);

  const form = useForm<User>({
    mode: 'onBlur',
    resolver: zodResolver(UserSchema),
    defaultValues: user == null ? { ...defaultUser } : { ...user }
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

  return (
    <Dialog key={'edit-user-dialog'} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {user == null ? (
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" type='password' {...field} />
                    </FormControl>
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
