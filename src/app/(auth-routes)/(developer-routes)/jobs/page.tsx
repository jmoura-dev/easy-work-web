'use client'

import { Search } from 'lucide-react'
import * as Input from '@/app/components/Input'
import { getJobs } from '@/data/jobs'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { JobCard } from '@/app/components/JobCard'

export default function Jobs() {
  const [page, setPage] = useState(1)

  const {
    data: jobs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => getJobs(page),
  })

  if (isLoading) {
    return <p>Carregando...</p>
  }

  if (isError) {
    return <p>Ocorreu um erro ao carregar as vagas.</p>
  }

  if (!jobs) {
    return null
  }

  const { jobs: allJobs } = jobs

  return (
    <div>
      <h1 className="mb-2 text-center font-mirza text-2xl font-semibold text-zinc-800">
        Encontre a vaga que combina com você
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
          placeholder="Encontre uma vaga pelo título"
        />
      </Input.Root>

      <div className="flex flex-col gap-3 pt-4">
        <JobCard
          company="Contrata LTDA"
          created_at={new Date()}
          title="Desenvolvedor backend"
          wage={1500}
        />
        <JobCard
          company="Moura serviços"
          created_at={new Date()}
          title="Desenvolvedor fullstack"
          wage={1500}
        />
        <JobCard
          company="Seja programador TI"
          created_at={new Date()}
          title="Desenvolvedor frontend"
          wage={1500}
        />
      </div>
    </div>
  )
}
