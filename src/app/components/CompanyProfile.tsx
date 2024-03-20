'use client'

import { useQuery } from '@tanstack/react-query'
import { User, Wallet, Banknote } from 'lucide-react'
import { redirect } from 'next/navigation'
import { SkeletonJobs } from './SkeletonJobs'
import { getCompanyDetails } from '@/data/companies'
import Image from 'next/image'

export function CompanyProfile() {
  const {
    data: company,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['getCompany'],
    queryFn: getCompanyDetails,
  })

  if (isLoading) {
    return <SkeletonJobs />
  }

  if (isError) {
    alert('Erro ao carregar perfil')
    return redirect('/dashboard')
  }

  if (!company) {
    return null
  }

  const { companyWithDetails } = company

  const nameWithFirstLetterCapitalized =
    companyWithDetails.userName.charAt(0).toUpperCase() +
    companyWithDetails.userName.slice(1)

  return (
    <div className="m-auto flex h-full max-w-5xl flex-col gap-3 rounded-md bg-violet-100 px-5 py-5 lg:gap-8 lg:px-10">
      <div className="flex max-h-20 flex-1 md:max-h-44">
        {companyWithDetails.avatarUrl ? (
          <Image
            alt="imagem de perfil"
            src={`${process.env.URL_DOMAIN}/${companyWithDetails.avatarUrl}`}
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
          {companyWithDetails.state}
        </span>
      </div>

      <div className="my-2 flex justify-between text-sm font-semibold text-zinc-800 lg:text-base">
        <p className="flex items-center gap-1">
          <Wallet width={20} />
          {companyWithDetails.city ? 'Freela/Contrato' : 'Apenas freelancer'}
        </p>
        <p className="flex items-center gap-1">
          <Banknote width={20} />
          R$:
          {companyWithDetails.site_url}
        </p>
      </div>

      <div className="mb-3 mt-2 rounded-md border-b border-violet-400 p-2 text-sm font-semibold text-zinc-700 lg:text-base">
        {companyWithDetails.about}
      </div>
    </div>
  )
}
