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
