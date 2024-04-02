'use client'

import * as Input from '@/app/components/Input'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getCandidatures } from '@/data/candidatures'
import { CandidatureCard } from '@/app/components/CandidatureCard'
import { Search } from 'lucide-react'
import { redirect } from 'next/navigation'
import { SkeletonCandidatures } from '@/app/components/SkeletonCandidatures'

export default function Jobs() {
  const [candidatureFilteredByTitle, setCandidatureFilteredByTitle] =
    useState('')

  const {
    data: candidatures,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['candidatures'],
    queryFn: getCandidatures,
  })
  if (isLoading) {
    return <SkeletonCandidatures />
  }

  if (isError) {
    alert('Erro ao carregar as vagas')
    return redirect('/dashboard')
  }

  if (!candidatures) {
    return null
  }

  const { candidatures: allCandidatures } = candidatures

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center font-mirza text-2xl font-semibold text-zinc-800 lg:text-3xl 2xl:text-4xl">
        Veja suas candidaturas por ordem de inscrição
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
          onChange={(e) => setCandidatureFilteredByTitle(e.target.value)}
        />
      </Input.Root>

      <ul className="relative flex flex-col items-start gap-3 md:grid md:grid-cols-2 3xl:grid-cols-3">
        {allCandidatures.length > 0 &&
          (() => {
            let filteredCandidatures = allCandidatures

            if (candidatureFilteredByTitle !== '') {
              filteredCandidatures = allCandidatures.filter((candidature) =>
                candidature.title.includes(
                  candidatureFilteredByTitle.toLowerCase(),
                ),
              )
            }
            if (filteredCandidatures.length === 0) {
              return (
                <p className="absolute m-auto w-full text-center text-lg font-semibold text-violet-600 lg:text-2xl">
                  Oops... Nenhuma candidatura foi encontrada 😞
                </p>
              )
            }

            return filteredCandidatures.map((candidature) => (
              <CandidatureCard
                key={candidature.id}
                companyName={candidature.companyName}
                title={candidature.title}
                status={candidature.status}
                updatedAt={candidature.updated_at}
                createdAt={candidature.created_at}
              />
            ))
          })()}
      </ul>
    </div>
  )
}
