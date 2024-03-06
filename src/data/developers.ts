import { api } from '@/app/api/axios'
import { getSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

interface DevelopersProps {
  developersWithTechs: {
    about: string
    available_for_contract: boolean
    developerId: string
    occupation_area: string
    price_per_hour: number
    techs: {
      name: string
      id: string
    }[]
    userName: string
  }[]
}

export async function getDevelopers(): Promise<DevelopersProps> {
  const response = await api.get('/developers/list')

  return response.data
}

interface DeveloperDetailsProps {
  developerWithDetails: {
    developerId: string
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

  const token = session.user.access_token
  const userId = session.user.userId

  const response = await api.get(`/developers/${userId}/details`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}
