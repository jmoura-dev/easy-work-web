'use client'

import { getDeveloperDetails } from '@/data/developers'
import { useQuery } from '@tanstack/react-query'
import { SkeletonJobs } from './SkeletonJobs'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { Banknote, User, Wallet } from 'lucide-react'
import { Tech } from './UserCard/Tech'
import { EditDeveloperDetails } from './EditDeveloperDetails'
import { SocialMedia } from './SocialMedia'

export function DeveloperProfile() {
  const {
    data: developer,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['getDeveloper'],
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
    <div className="m-auto flex h-full max-w-5xl flex-col gap-3 rounded-md bg-violet-100 px-5 py-5 lg:gap-8 lg:px-10">
      <div className="flex max-h-20 flex-1 md:max-h-44">
        {developerWithDetails.avatarUrl ? (
          <Image
            alt="imagem de perfil"
            src={`${process.env.URL_DOMAIN}/${developerWithDetails.avatarUrl}`}
            className="m-auto h-16 w-16 rounded-full md:h-20 md:w-20 lg:h-32 lg:w-32"
            width={500}
            height={500}
            priority
          />
        ) : (
          <User className="m-auto h-14 w-14 rounded-full bg-violet-300 p-1 text-zinc-800 md:h-16 md:w-16 lg:h-28 lg:w-28" />
        )}
      </div>
      <div className="flex flex-col items-center justify-start">
        <h2 className="max-w-60 truncate font-mirza text-2xl font-semibold text-zinc-800 md:max-w-72 lg:max-w-full lg:text-3xl">
          {nameWithFirstLetterCapitalized}
        </h2>
        <span className="text-sm font-bold text-zinc-700 lg:text-base">
          {occupationAreaWithFirstLetterCapitalized}
        </span>
      </div>

      <div className="my-2 flex justify-between text-sm font-semibold text-zinc-800 lg:text-base">
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

      <div className="mb-3 mt-2 rounded-md border-b border-violet-400 p-2 text-sm font-semibold text-zinc-700 lg:text-base">
        {developerWithDetails.about}
      </div>

      <ul className="flex flex-wrap rounded-md border-b border-violet-400 pb-5 lg:mt-3">
        {developerWithDetails.techs.length > 0 ? (
          <li className="flex w-full flex-wrap justify-evenly gap-2 text-sm">
            {developerWithDetails.techs.map((tech) => (
              <Tech techName={tech.name} key={tech.id} />
            ))}
          </li>
        ) : (
          <span className="whitespace-normal text-center text-sm font-semibold text-zinc-800 lg:text-base">
            *Nenhuma habilidade adicionada
          </span>
        )}
      </ul>

      <SocialMedia
        linkedIn={developerWithDetails.linkedin}
        github={developerWithDetails.github}
        portfolio={developerWithDetails.portfolio}
      />

      <div className="m-auto flex w-full items-end lg:mr-0 lg:max-w-48 lg:items-end">
        <EditDeveloperDetails
          userName={developerWithDetails.userName}
          avatarUrl={developerWithDetails.avatarUrl}
          occupation_area={developerWithDetails.occupation_area}
          available_for_contract={developerWithDetails.available_for_contract}
          price_per_hour={developerWithDetails.price_per_hour}
          about={developerWithDetails.about}
          linkedin={developerWithDetails.linkedin}
          github={developerWithDetails.github}
          portfolio={developerWithDetails.portfolio}
          techs={developerWithDetails.techs}
        />
      </div>
    </div>
  )
}
