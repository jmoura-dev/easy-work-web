'use client'

import { Search } from 'lucide-react'
import * as Input from '@/app/components/Input'
import { getJobs } from '@/data/jobs'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { JobCard } from '@/app/components/JobCard'

export default function Jobs() {
  const [page, setPage] = useState(1)
  const [jobFilteredByTitle, setJobFilteredByTitle] = useState('')

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
    <div className="xl:px-10">
      <h1 className="mb-2 text-center font-mirza text-2xl font-semibold text-zinc-800 lg:text-3xl 2xl:text-4xl">
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
          onChange={(e) => setJobFilteredByTitle(e.target.value)}
        />
      </Input.Root>

      <ul className="relative flex flex-col items-start gap-3 pt-4 md:grid md:grid-cols-2 3xl:grid-cols-3">
        {allJobs.length > 0 &&
          (() => {
            let filteredJobs = allJobs

            if (jobFilteredByTitle !== '') {
              filteredJobs = allJobs.filter((job) =>
                job.title.includes(jobFilteredByTitle.toLowerCase()),
              )
            }
            if (filteredJobs.length === 0) {
              return (
                <p className="absolute m-auto w-full text-center text-lg font-semibold text-violet-600 lg:text-2xl">
                  Oops... Nenhuma vaga encontrada 😞
                </p>
              )
            }
            return filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                company={job.companyName}
                created_at={job.created_at}
                title={job.title.charAt(0).toUpperCase() + job.title.slice(1)}
                remuneration={job.remuneration}
                workMode={job.workMode}
                workSchedule={job.workSchedule}
                hoursPerWeek={job.hoursPerWeek}
              />
            ))
          })()}
      </ul>
    </div>
  )
}
