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

export async function getDeveloperByUserId(
  userId: string,
): Promise<DeveloperDetailsProps> {
  const session = await getSession()

  if (!session) {
    redirect('/signIn')
  }

  const token = session.user.access_token

  const response = await api.get(`/developers/${userId}/details`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

interface UpdateDeveloperRequest {
  name?: string
  avatar?: FileList
  oldPassword?: string
  newPassword?: string
  about?: string
  price_per_hour?: number
  occupation_area?: string
  available_for_contract?: boolean
}

export async function updateDeveloper({
  name,
  avatar,
  oldPassword,
  newPassword,
  about,
  price_per_hour,
  occupation_area,
  available_for_contract,
}: UpdateDeveloperRequest) {
  const session = await getSession()

  if (!session) {
    redirect('/signIn')
  }

  const token = session.user.access_token
  const userId = session.user.userId
  let avatarId

  if (avatar && avatar.length > 0) {
    const formData = new FormData()
    formData.append('file', avatar[0])

    const response = await api.post('/avatar', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    avatarId = response.data.avatarId
  }

  await api.put(
    `/users/${userId}`,
    { name, oldPassword, newPassword, avatarId, about },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  await api.put(
    '/developers/',
    { price_per_hour, occupation_area, available_for_contract },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
