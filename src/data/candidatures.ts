import { api } from '@/app/api/axios'
import { getSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

interface GetCandidaturesPropsResponse {
  candidatures: {
    id: string
    status: string
    createdAt: Date
    updatedAt: Date | null
  }[]
}

export async function getCandidatures(
  page: number,
): Promise<GetCandidaturesPropsResponse> {
  const session = await getSession()

  if (!session) {
    redirect('/signIn')
  }

  const token = session.user.access_token
  const userId = session.user.userId

  const response = await api.get(
    `/candidatures/${userId}/developer?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data
}

export async function createCandidature(jobId: string) {
  const session = await getSession()

  if (!session) {
    redirect('/signIn')
  }

  const token = session.user.access_token
  console.log(jobId)

  try {
    await api.post(
      '/candidatures',
      { jobId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    alert('Candidatura criada com sucesso!')
  } catch (err) {
    console.log(err)
  }
}
