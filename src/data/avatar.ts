import { api } from '@/app/api/axios'
import { getSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

interface UploadAvatarRequest {
  image: File
}

interface UploadAvatarResponse {
  avatarId: string
}

export async function uploadAvatar({
  image,
}: UploadAvatarRequest): Promise<UploadAvatarResponse> {
  const session = await getSession()

  if (!session) {
    redirect('/signIn')
  }

  const token = session.user.access_token
  const formData = new FormData()
  formData.append('file', image)

  const response = await api.post('/avatar', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}
