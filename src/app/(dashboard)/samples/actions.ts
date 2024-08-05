'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/lib/db';

import type { Sample } from '@prisma/client';
import type { Sample as ZodSample } from './SampleSchema';
import { SampleSchema } from './SampleSchema';

// type ReturnType = {
//   message: string;
//   errors?: Record<string, unknown>;
// };

export async function getSamples(
  search: string,
  offset: number
): Promise<{
  samples: Sample[];
  newOffset: number | null;
  totalSamples: number;
}> {
  // Always search the full table, not per page
  // .select()
  //       .from(samples)
  //       .where(ilike(samples.name, `%${search}%`))
  //       .limit(1000)
  if (search) {
    const samples: Sample[] = await prisma.sample.findMany({
      where: { name: { contains: search }, isDeleted: false },
      take: 1000
    });
    return {
      samples: samples,
      newOffset: null,
      totalSamples: 0
    };
  }

  if (offset === null) {
    return { samples: [], newOffset: null, totalSamples: 0 };
  }

  const totalSamples = await prisma.sample.count();
  const moreSamples = await prisma.sample.findMany({
    where: { isDeleted: false },
    skip: offset,
    take: 5
  });
  const newOffset = moreSamples.length >= 5 ? offset + 5 : null;

  return {
    samples: moreSamples,
    newOffset,
    totalSamples
  };
}

export async function editSample(currentState, formData: ZodSample) {
  const parsed = SampleSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      message: 'Submission Failed',
      errors: parsed.error.flatten().fieldErrors
    };
  }
  console.log(68, formData);

  try {
    if (formData.id) {
      const updated = await prisma.sample.update({
        where: { id: formData.id },
        data: { ...formData, updatedAt: new Date(Date.now()).toISOString() }
      });
      console.log(76, updated);
    } else {
      const created = await prisma.sample.create({
        data: {
          ...formData,
          ownerId: 2,
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
export async function deleteSample(formData: FormData) {
  const id = formData.get('id') as string;
  await prisma.sample.update({ where: { id: id }, data: { isDeleted: true } });
  revalidatePath('/');
}
