'use client'

import * as Input from '@/app/components/Input'
import { MyJobCard } from '@/app/components/MyJobCard'
import { SkeletonJobs } from '@/app/components/SkeletonJobs'
import { getJobsWithCandidaturesAmount } from '@/data/jobs'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useState } from 'react'

export default function MyJobs() {
  const [jobFilteredByTitle, setJobFilteredByTitle] = useState<string>('')

  const {
    data: jobs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['getJobsWithCandidaturesAmount'],
    queryFn: getJobsWithCandidaturesAmount,
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

  const { jobsWithCandidaturesAmount: allJobs } = jobs

  return (
    <div>
      <h1 className="mb-10 text-center font-mirza text-2xl font-semibold text-zinc-800 lg:text-3xl 2xl:text-4xl">
        Veja os detalhes de suas vagas e seus respectivos candidatos
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
          onChange={(e) => setJobFilteredByTitle(e.target.value)}
        />
      </Input.Root>

      <ul className="relative grid gap-4 xl:grid-cols-2">
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
              <MyJobCard
                key={job.id}
                title={job.title}
                description={job.description}
                workMode={job.workMode}
                workSchedule={job.workSchedule}
                remuneration={job.remuneration}
                hoursPerWeek={job.hoursPerWeek}
                candidaturesAmount={job.candidaturesAmount}
                createdAt={job.created_at}
                candidatures={job.candidatures}
              />
            ))
          })()}
      </ul>
    </div>
  )
}
