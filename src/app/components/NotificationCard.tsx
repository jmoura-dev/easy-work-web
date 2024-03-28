import { readNotification } from '@/data/notifications'
import { useMutation } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Bell, BellRing } from 'lucide-react'

export interface NotificationCardProps {
  id: string
  title: string
  content: string
  readAt: Date | null
  createdAt: Date
}

export function NotificationCard({
  id,
  title,
  content,
  readAt,
  createdAt,
}: NotificationCardProps) {
  const createdAtFormatted = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: ptBR,
  })

  const { mutateAsync: readNotificationFn, isPending } = useMutation({
    mutationFn: readNotification,
  })

  async function handleReadNotification(notificationId: string) {
    await readNotificationFn(notificationId)
  }

  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-md bg-violet-600/80 p-2">
      <div className="flex w-full justify-between gap-4 px-1">
        <div className="flex h-10 w-full max-w-12 flex-col items-center justify-center rounded-md bg-violet-700/70 pb-1 font-mirza text-2xl font-bold text-zinc-300">
          <span className="-ml-3 text-xl">
            E<span className="text-sm font-normal">asy</span>
          </span>
          <span className="-mr-2 -mt-4 text-xl">
            W<span className="text-sm font-normal">ork</span>
          </span>
        </div>
        <div className="flex w-full flex-col divide-y divide-dashed">
          <h2 className="text-md font-mirza font-semibold text-white lg:text-xl">
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </h2>
        </div>
        <div className="relative">
          {readAt ? (
            <Bell width={18} className="text-zinc-200" />
          ) : (
            <BellRing width={18} className="text-zinc-200" fill="#dc2626" />
          )}
        </div>
      </div>

      <p className="max-w-[80%] text-sm font-semibold text-zinc-100">
        {content}
      </p>
      <div className="flex w-full items-center justify-between">
        <span
          title="última atualização"
          className="flex justify-end gap-1 text-xs text-zinc-300"
        >
          Atualizado <span className="font-bold"> {createdAtFormatted}</span>
        </span>

        <button
          type="button"
          onClick={() => handleReadNotification(id)}
          className="rounded-md bg-green-600 px-2 py-1.5 text-xs font-semibold text-zinc-200 hover:bg-green-700/80 disabled:cursor-not-allowed disabled:bg-green-900"
          disabled={isPending || readAt !== null}
        >
          Marcar como <strong>VISTO</strong>
        </button>
      </div>
    </div>
  )
}
