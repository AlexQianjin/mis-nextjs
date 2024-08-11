'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/lib/db';

import type { User } from '@prisma/client';
import type { User as ZodUser } from './UserSchema';
import { UserSchema } from './UserSchema';

// type ReturnType = {
//   message: string;
//   errors?: Record<string, unknown>;
// };

export async function getUsers(
  search: string,
  offset: number
): Promise<{
  users: User[];
  newOffset: number | null;
  totalUsers: number;
}> {
  // Always search the full table, not per page
  // .select()
  //       .from(samples)
  //       .where(ilike(samples.name, `%${search}%`))
  //       .limit(1000)
  if (search) {
    const users: User[] = await prisma.user.findMany({
      where: { name: { contains: search } },
      take: 1000
    });
    return {
      users: users,
      newOffset: null,
      totalUsers: 0
    };
  }

  if (offset === null) {
    return { users: [], newOffset: null, totalUsers: 0 };
  }

  const totalUsers = await prisma.user.count();
  const moreUsers = await prisma.user.findMany({
    skip: offset,
    take: 5
  });
  const newOffset = moreUsers.length >= 5 ? offset + 5 : null;

  return {
    users: moreUsers,
    newOffset,
    totalUsers: totalUsers
  };
}

export async function editUser(currentState, formData: ZodUser) {
  const parsed = UserSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      message: 'Submission Failed',
      errors: parsed.error.flatten().fieldErrors
    };
  }
  console.log(68, formData);

  try {
    if (formData.id) {
      const updated = await prisma.user.update({
        where: { id: formData.id },
        data: { ...formData, updatedAt: new Date(Date.now()).toISOString() }
      });
      console.log(76, updated);
    } else {
      const created = await prisma.user.create({
        data: {
          ...formData,
          updatedAt: new Date(Date.now()).toISOString()
        }
      });
      console.log(85, created);
    }

    return { message: 'success', errors: '' };
  } catch (error) {
    return { message: 'failed', errors: error };
  }
}
export async function deleteUser(formData: FormData) {
  const id = formData.get('id') as string;
  await prisma.user.delete({ where: { id: id } });
  revalidatePath('/');
}
