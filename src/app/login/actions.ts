'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  let errorOccurred = false;
  try {
    await signIn('credentials', formData);
  } catch (error) {
    console.log(15, error);
    if (error instanceof AuthError) {
      errorOccurred = true;
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  } finally {
    console.log(26, errorOccurred);
    if (!errorOccurred) {
      console.log(27, 'redirect');
      redirect('/samples');
    }
  }
}
