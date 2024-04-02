import { api } from '@/app/api/axios'
import { AxiosError } from 'axios'
import { getSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

interface GetCandidaturesPropsResponse {
  candidatures: {
    id: string
    companyName: string
    title: string
    status: string
    created_at: Date
    updated_at: Date
  }[]
}

export async function getCandidatures(): Promise<GetCandidaturesPropsResponse> {
  const session = await getSession()

  if (!session) {
    redirect('/signIn')
  }

  const page = 1
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
    const axiosError = err as AxiosError<any>
    if (axiosError.response) {
      const status = axiosError.response.status

      switch (status) {
        case 409:
          alert(axiosError.response.data.message)
          break
        case 404:
          alert(axiosError.response.data.message)
          break
        default:
          alert('Internal server error')
      }
    }
  }
}

interface GetCandidatureByIdProps {
  candidature: {
    id: string
    status: string
    created_at: Date
    updated_at: Date
  }
}

export async function getCandidatureById(
  candidatureId: string,
): Promise<GetCandidatureByIdProps> {
  const session = await getSession()

  if (!session) {
    redirect('/signIn')
  }

  const token = session.user.access_token

  const response = await api.get(`/candidatures/${candidatureId}/details`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

interface updateStatusCandidatureProps {
  candidatureId: string
  status: string
}

export async function updateStatusCandidature({
  candidatureId,
  status,
}: updateStatusCandidatureProps) {
  const session = await getSession()

  if (!session) {
    redirect('/signIn')
  }

  const token = session.user.access_token

  const response = await api.patch(
    `/candidatures/${candidatureId}`,
    {
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data
}
