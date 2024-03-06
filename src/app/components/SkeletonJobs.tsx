import { Skeleton } from '@/components/ui/skeleton'
import * as Input from '@/app/components/Input'
import { Search } from 'lucide-react'

export function SkeletonJobs() {
  return (
    <>
      <Input.Root
        className="m-auto my-4 flex w-full max-w-80 items-center gap-2 rounded-2xl border border-zinc-300 px-3 py-2 shadow-sm focus-within:border-violet-400 focus-within:ring-4
    focus-within:ring-violet-100 md:max-w-96 lg:mb-16 lg:max-w-2xl"
      >
        <Input.Prefix className="text-zinc-500">
          <Search />
        </Input.Prefix>
        <Input.Control
          type="text"
          placeholder="Encontre uma vaga pelo título"
        />
      </Input.Root>
      <div className="grid grid-cols-2 gap-3 pt-4 lg:grid-cols-3 3xl:grid-cols-4">
        <Skeleton className="h-44 w-full rounded-md bg-violet-400 pl-px md:h-60 lg:h-64" />
        <Skeleton className="h-44 w-full rounded-md bg-violet-400 pl-px md:h-60 lg:h-64" />
        <Skeleton className="h-44 w-full rounded-md bg-violet-400 pl-px md:h-60 lg:h-64" />
        <Skeleton className="h-44 w-full rounded-md bg-violet-400 pl-px md:h-60 lg:h-64" />
        <Skeleton className="h-44 w-full rounded-md bg-violet-400 pl-px md:h-60 lg:h-64" />
        <Skeleton className="h-44 w-full rounded-md bg-violet-400 pl-px md:h-60 lg:h-64" />
        <Skeleton className="h-44 w-full rounded-md bg-violet-400 pl-px md:h-60 lg:h-64" />
        <Skeleton className="h-44 w-full rounded-md bg-violet-400 pl-px md:h-60 lg:h-64" />
      </div>
    </>
  )
}
