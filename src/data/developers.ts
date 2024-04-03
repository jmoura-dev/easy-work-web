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
    linkedin: string | null
    github: string | null
    portfolio: string | null
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
    linkedin: string | null
    github: string | null
    portfolio: string | null
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
  linkedin?: string
  github?: string
  portfolio?: string
  available_for_contract?: boolean
  techs: {
    name: string
  }[]
}

export async function updateDeveloper({
  name,
  avatar,
  oldPassword,
  newPassword,
  about,
  price_per_hour,
  occupation_area,
  linkedin,
  github,
  portfolio,
  available_for_contract,
  techs,
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
    {
      price_per_hour,
      occupation_area,
      linkedin,
      github,
      portfolio,
      available_for_contract,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  await api.put(
    `/developer-technology/${userId}/update`,
    { techs },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}

interface RegisterNewDeveloperProps {
  name: string
  email: string
  password: string
  avatar?: FileList
  about?: string
  price_per_hour?: number
  occupation_area: string
  available_for_contract: string
  linkedin?: string
  github?: string
  portfolio?: string
  techs: {
    name: string
  }[]
}

export async function registerNewDeveloper(data: RegisterNewDeveloperProps) {
  let avatarId

  if (data.avatar && data.avatar.length > 0) {
    const formData = new FormData()
    formData.append('file', data.avatar[0])

    const response = await api.post('/avatar', formData)

    avatarId = response.data.avatarId
  }

  const dataUser = {
    name: data.name,
    email: data.email,
    avatarId,
    password: data.password,
    about: data.about,
  }

  const response = await api.post('/users', dataUser)
  const userId = response.data.userId

  const isAvailableForContract = data.available_for_contract === 'true'

  const dataDeveloper = {
    userId,
    available_for_contract: isAvailableForContract,
    occupation_area: data.occupation_area,
    price_per_hour: data.price_per_hour,
    linkedin: data.linkedin,
    github: data.github,
    portfolio: data.portfolio,
  }

  await api.post('/developers', dataDeveloper)

  if (data.techs.length > 0) {
    await Promise.all(
      data.techs.map(async (tech) => {
        return api.post(`/developer-technology/${userId}`, {
          technologyName: tech.name,
        })
      }),
    )
  }
}
