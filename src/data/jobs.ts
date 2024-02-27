import { api } from '@/app/api/axios'
import { getSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

interface GetJobsPropsResponse {
  jobs: {
    id: string
    companyName: string
    title: string
    description: string
    workMode: string
    workSchedule: string
    remuneration: number
    hoursPerWeek: number
    created_at: Date
  }[]
}

export async function getJobs(page: number): Promise<GetJobsPropsResponse> {
  const session = await getSession()

  if (!session) {
    redirect('/signIn')
  }

  const token = session.user.access_token

  const response = await api.get(`/jobs/fetch/list?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}
