import ButtonLogout from '../ButtonLogout'
import Image from 'next/image'

export interface ProfileProps {
  name: string
  email: string
}

export function Profile({ name, email }: ProfileProps) {
  return (
    <div className="mt-4 flex items-center gap-3 border-t border-zinc-300 pb-1 pt-6">
      <Image
        src="https://github.com/jmoura-dev.png"
        alt="imagem de perfil"
        className="rounded-full"
        width={50}
        height={50}
      />
      <div className="flex flex-1 flex-col truncate">
        <span className="font-semibold text-zinc-800">{name}</span>
        <span className="truncate text-sm font-semibold text-zinc-600">
          {email}
        </span>
      </div>
      <ButtonLogout />
    </div>
  )
}
