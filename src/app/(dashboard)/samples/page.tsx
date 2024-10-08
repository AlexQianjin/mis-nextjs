import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SamplesTable } from './samples-table';
import { DialogEdit } from './sample-edit';
import { getSamples } from './actions';
import { auth } from '@/auth';

export default async function SamplesPage({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {
  const session = await auth();

  if (!session?.user) {
    return null;
  }
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  const { samples, newOffset, totalSamples } = await getSamples(
    search,
    Number(offset)
  );

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <DialogEdit user={session.user}/>
        </div>
      </div>
      <TabsContent value="all">
        <SamplesTable
          samples={samples}
          offset={newOffset ?? 0}
          totalSamples={totalSamples}
          user={session.user}
        />
      </TabsContent>
    </Tabs>
  );
}
