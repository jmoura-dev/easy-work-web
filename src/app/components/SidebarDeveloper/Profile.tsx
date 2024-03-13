import { User } from 'lucide-react'
import ButtonLogout from '../ButtonLogout'
import Image from 'next/image'

export interface ProfileProps {
  name: string
  occupation_area: string
  avatarUrl?: string
}

export function Profile({ name, occupation_area, avatarUrl }: ProfileProps) {
  return (
    <div className="mt-4 flex items-center gap-3 border-t border-zinc-300 pb-1 pt-6">
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="imagem de perfil"
          className="rounded-full"
          priority
          width={50}
          height={50}
        />
      ) : (
        <User className="h-10 w-10 rounded-full bg-violet-300 p-1 text-zinc-800 md:h-12 md:w-12 lg:h-14 lg:w-14" />
      )}

      <div className="flex flex-1 flex-col truncate">
        <span className="truncate font-semibold text-zinc-800">{name}</span>
        <span className="truncate text-sm font-semibold text-zinc-600">
          {occupation_area}
        </span>
      </div>
      <ButtonLogout />
    </div>
  )
}
