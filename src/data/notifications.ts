import { api } from '@/app/api/axios'
import { AxiosError } from 'axios'
import { getSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

interface GetNotificationsPropsResponse {
  notifications: {
    id: string
    title: string
    content: string
    readAt: Date | null
    createdAt: Date
  }[]
}

export async function getNotifications(): Promise<GetNotificationsPropsResponse> {
  const session = await getSession()

  if (!session) {
    redirect('/signIn')
  }

  const token = session.user.access_token
  const userId = session.user.userId

  const response = await api.get(`/notifications/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

export async function readNotification(notificationId: string) {
  const session = await getSession()

  if (!session) {
    redirect('/signIn')
  }

  const token = session.user.access_token

  try {
    await api.patch(
      `notifications/${notificationId}/read`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return alert('Notificação salva como "vista"')
  } catch (err) {
    const axiosError = err as AxiosError<any>
    console.error(axiosError)

    if (axiosError.response) {
      const status = axiosError.response.status

      switch (status) {
        case 404:
          alert(axiosError.response.data.message)
          break
        default:
          alert('Internal server error')
      }
    }
  }
}
