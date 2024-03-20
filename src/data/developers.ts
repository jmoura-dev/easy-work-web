import { api } from '@/app/api/axios'
import { getSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export interface DevelopersProps {
  developersWithTechs: {
    developerId: string
    avatarUrl: string | null
    userName: string
    about: string
    available_for_contract: boolean
    occupation_area: string
    price_per_hour: number
    techs: {
      name: string
      id: string
    }[]
  }[]
}

export async function getDevelopers(): Promise<DevelopersProps> {
  const response = await api.get('/developers/list')

  return response.data
}

interface DevelopersFiltersProps {
  name?: string
  page: number
  occupation_area?: string
  techs: {
    name: string
  }[]
}

export async function searchDevelopersByFilters({
  name,
  occupation_area,
  techs,
  page,
}: DevelopersFiltersProps): Promise<DevelopersProps> {
  const techNames = techs.map((tech) => tech.name)

  const params = new URLSearchParams({
    page: String(page),
    name: name || '',
    occupation_area: occupation_area || '',
    techs: techNames.join(','),
  })

  const response = await api.get(`/developers/list?${params}`)

  return response.data
}

interface DeveloperDetailsProps {
  developerWithDetails: {
    developerId: string
    avatarUrl: string | null
    userName: string
    about: string
    available_for_contract: boolean
    occupation_area: string
    price_per_hour: number
    techs: {
      name: string
      id: string
    }[]
  }
}

export async function getDeveloperDetails(): Promise<DeveloperDetailsProps> {
  const session = await getSession()

  if (!session) {
    redirect('/signIn')
  }

  if (!session.user.developerId) {
    location.reload()
  }

  const token = session.user.access_token
  const userId = session.user.userId

  const response = await api.get(`/developers/${userId}/details`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}
