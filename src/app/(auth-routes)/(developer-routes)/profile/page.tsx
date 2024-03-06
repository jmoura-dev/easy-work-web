'use client'

import { DialogDeveloperDetails } from '@/app/components/DialogDeveloperDetails'
import { SkeletonJobs } from '@/app/components/SkeletonJobs'
import { Tech } from '@/app/components/UserCard/Tech'
import { getDeveloperDetails } from '@/data/developers'
import { useQuery } from '@tanstack/react-query'
import { Banknote, Wallet } from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export interface DevelopeDetailsProps {
  name: string
}

export default function Profile({ name }: DevelopeDetailsProps) {
  const {
    data: developer,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['developers'],
    queryFn: getDeveloperDetails,
  })

  if (isLoading) {
    return <SkeletonJobs />
  }

  if (isError) {
    alert('Erro ao carregar perfil')
    return redirect('/dashboard')
  }

  if (!developer) {
    return null
  }

  const { developerWithDetails } = developer

  const nameWithFirstLetterCapitalized =
    developerWithDetails.userName.charAt(0).toUpperCase() +
    developerWithDetails.userName.slice(1)
  const occupationAreaWithFirstLetterCapitalized =
    developerWithDetails.occupation_area.charAt(0).toUpperCase() +
    developerWithDetails.occupation_area.slice(1)

  return (
    <div className="flex h-full flex-col gap-3">
      <Image
        alt="imagem de perfil"
        src="https://github.com/jmoura-dev.png"
        className="m-auto h-16 w-16 rounded-full"
        width={500}
        height={500}
        priority
      />
      <div className="flex flex-col items-center justify-start">
        <h2 className="max-w-72 truncate font-mirza text-2xl font-semibold text-zinc-800">
          {nameWithFirstLetterCapitalized}
        </h2>
        <span className="text-sm font-bold text-zinc-700">
          {occupationAreaWithFirstLetterCapitalized}
        </span>
      </div>

      <div className="my-2 flex justify-between text-sm font-semibold text-zinc-800">
        <p className="flex items-center gap-1">
          <Wallet width={20} />
          {developerWithDetails.available_for_contract
            ? 'Freela/Contrato'
            : 'Apenas freelancer'}
        </p>
        <p className="flex items-center gap-1">
          <Banknote width={20} />
          R$:
          {developerWithDetails.price_per_hour
            ? developerWithDetails.price_per_hour.toFixed(2) + '/HR'
            : 'Não Informado'}
        </p>
      </div>

      <div className="mb-3 mt-2 rounded-md border-b border-violet-400 p-2 text-sm font-semibold text-zinc-700">
        {developerWithDetails.about}
      </div>

      <ul className="mb-6 flex flex-wrap lg:mt-3">
        {developerWithDetails.techs.length > 0 ? (
          <li className="flex w-full flex-wrap justify-evenly gap-2">
            {developerWithDetails.techs.map((tech) => (
              <Tech techName={tech.name} key={tech.id} />
            ))}
          </li>
        ) : (
          <span className="whitespace-normal text-center text-sm font-semibold text-zinc-800">
            *Nenhuma habilidade adicionada
          </span>
        )}
      </ul>

      <DialogDeveloperDetails
        userName={developerWithDetails.userName}
        occupation_area={developerWithDetails.occupation_area}
        available_for_contract={developerWithDetails.available_for_contract}
        about={developerWithDetails.about}
        techs={developerWithDetails.techs}
        price_per_hour={developerWithDetails.price_per_hour}
      />
    </div>
  )
}
