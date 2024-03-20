'use client'

import * as Input from '@/app/components/Input'
import { SkeletonJobs } from '@/app/components/SkeletonJobs'
import { getJobsByCompany } from '@/data/jobs'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { redirect } from 'next/navigation'

export default function MyJobs() {
  const {
    data: jobs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['getJobs'],
    queryFn: getJobsByCompany,
  })

  if (isLoading) {
    return <SkeletonJobs />
  }

  if (isError) {
    alert('Erro ao carregar as vagas')
    return redirect('/dashboard')
  }

  if (!jobs) {
    return null
  }

  const { jobs: allJobs } = jobs

  return (
    <div>
      <h1 className="text-center font-mirza text-2xl font-semibold text-zinc-800 lg:text-3xl 2xl:text-4xl">
        Veja suas vagas por ordem de inscrição
      </h1>

      <Input.Root
        className="m-auto my-4 flex w-full max-w-80 items-center gap-2 rounded-2xl border border-zinc-300 px-3 py-2 shadow-sm focus-within:border-violet-400 focus-within:ring-4
    focus-within:ring-violet-100 md:max-w-96 lg:mb-16 lg:max-w-2xl"
      >
        <Input.Prefix className="text-zinc-500">
          <Search />
        </Input.Prefix>
        <Input.Control
          type="text"
          placeholder="Encontre sua vaga pelo título"
        />
      </Input.Root>

      {allJobs.map((job) => (
        <p key={job.id}>Hello</p>
      ))}
    </div>
  )
}
