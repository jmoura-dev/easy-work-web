import { api } from '@/app/api/axios'
import { getSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

interface getTechnologiesResponse {
  technologies: {
    id: string
    name: string
  }[]
}

export async function getTechnologies(): Promise<getTechnologiesResponse> {
  const session = await getSession()

  if (!session) {
    redirect('/signIn')
  }

  const token = session.user.access_token

  const response = await api.get('/technologies', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}
