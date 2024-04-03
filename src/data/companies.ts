import { api } from '@/app/api/axios'
import { getSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

interface CompanyDetailsProps {
  companyWithDetails: {
    companyId: string
    avatarUrl: string | null
    userName: string
    about: string
    state: string | null
    city: string | null
    site_url: string | null
  }
}

export async function getCompanyDetails(): Promise<CompanyDetailsProps> {
  const session = await getSession()

  if (!session) {
    redirect('/signIn')
  }

  if (!session.user.companyId) {
    location.reload()
  }

  const token = session.user.access_token
  const userId = session.user.userId

  const response = await api.get(`/companies/${userId}/details`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

interface UpdateCompanyRequest {
  name?: string
  avatar?: FileList
  oldPassword?: string
  newPassword?: string
  about?: string
  state?: string
  city?: string
  site_url?: string
}

interface RegisterNewCompanyProps {
  name: string
  email: string
  password: string
  about?: string
  city?: string
  state?: string
  site_url?: string
}

export async function registerNewCompany({
  name,
  email,
  password,
  about,
  city,
  state,
  site_url,
}: RegisterNewCompanyProps) {
  const dataUser = {
    name,
    email,
    password,
    about,
  }
  const response = await api.post('/users', dataUser)

  const dataCompany = {
    userId: response.data.userId,
    city,
    state,
    site_url,
  }
  await api.post('/companies', dataCompany)
}

export async function updateCompany({
  name,
  avatar,
  oldPassword,
  newPassword,
  about,
  state,
  city,
  site_url,
}: UpdateCompanyRequest) {
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
    '/companies/',
    { state, city, site_url },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
