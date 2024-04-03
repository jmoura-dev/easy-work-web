'use client'

import { useQuery } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import { getNotifications } from '@/data/notifications'
import { SkeletonCandidatures } from '@/app/components/SkeletonCandidatures'
import { NotificationCard } from '@/app/components/NotificationCard'
import { toast } from 'react-toastify'

export default function Notifications() {
  const {
    data: notificationsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['getNotifications'],
    queryFn: getNotifications,
  })

  if (isLoading) {
    return <SkeletonCandidatures />
  }

  if (isError) {
    toast.warn('Erro ao carregar as notificações', {
      position: 'top-right',
    })
    return redirect('/dashboard')
  }

  if (!notificationsData) {
    return null
  }

  const { notifications } = notificationsData

  return (
    <div className="xl:px-10">
      <h1 className="mb-2 text-center font-mirza text-2xl font-semibold text-zinc-800 lg:text-3xl 2xl:text-4xl">
        Fique de olho nas notificações e veja o progresso de suas candidaturas
      </h1>

      <ul className="relative flex flex-col items-start gap-3 pt-4 md:grid md:grid-cols-2 3xl:grid-cols-3">
        {notifications.length > 0 &&
          notifications.map((item) => (
            <NotificationCard
              key={item.id}
              id={item.id}
              title={item.title}
              content={item.content}
              readAt={item.readAt}
              createdAt={item.createdAt}
            />
          ))}
      </ul>
    </div>
  )
}
