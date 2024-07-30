'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/lib/db';

import type { Sample } from '@prisma/client';
import type { Sample as ZodSample } from './SampleSchema';

type ReturnType = {
  message: string;
  errors?: Record<string, unknown>;
};

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
      where: { name: { contains: search } },
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

export async function editSample(
  currentState,
  formData: ZodSample
): Promise<ReturnType> {
  console.log(62, formData);
  return { message: 'success' };
}
export async function deleteSample(formData: FormData) {
  const id = formData.get('id') as string;
  await prisma.sample.delete({ where: { id: id } });
  revalidatePath('/');
}
