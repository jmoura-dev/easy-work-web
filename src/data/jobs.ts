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

export async function getJobsByCompany(): Promise<GetJobsPropsResponse> {
  const session = await getSession()
  const page = 1

  if (!session) {
    redirect('/signIn')
  }

  const userId = session.user.userId

  const token = session.user.access_token

  const response = await api.get(`/jobs/${userId}?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

interface GetJobsWithCandidaturesAmountPropsResponse {
  jobsWithCandidaturesAmount: {
    id: string
    title: string
    description: string
    workMode: string
    workSchedule: string
    remuneration: number
    hoursPerWeek: number
    created_at: Date
    candidaturesAmount: number
    candidatures: {
      candidatureId: string
      status: string
      userId: string
      userName: string
      occupation_area: string
    }[]
  }[]
}

export async function getJobsWithCandidaturesAmount(): Promise<GetJobsWithCandidaturesAmountPropsResponse> {
  const session = await getSession()

  if (!session) {
    redirect('/signIn')
  }

  const userId = session.user.userId
  const token = session.user.access_token

  const response = await api.get(`/jobs/${userId}/candidatures/amount`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

interface CreateNewJobProps {
  title: string
  description: string
  workMode: string
  workSchedule: string
  remuneration: number
  hoursPerWeek: number
}

export async function createNewJob({
  title,
  description,
  workMode,
  workSchedule,
  remuneration,
  hoursPerWeek,
}: CreateNewJobProps) {
  const session = await getSession()

  if (!session) {
    redirect('/signIn')
  }

  const token = session.user.access_token

  const response = await api.post(
    '/jobs',
    {
      title,
      description,
      workMode,
      workSchedule,
      remuneration,
      hoursPerWeek,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data
}
