import { LogOut } from 'lucide-react'

export interface ProfileProps {
  name: string
  email: string
}

export function Profile({ name, email }: ProfileProps) {
  return (
    <div className="mt-4 flex items-center gap-3 border-t border-zinc-300 pb-1 pt-6">
      <img
        src="https://github.com/jmoura-dev.png"
        alt="imagem de perfil"
        className="h-12 w-12 rounded-full"
      />
      <div className="flex flex-1 flex-col truncate">
        <span className="font-semibold text-zinc-800">{name}</span>
        <span className="truncate text-sm font-semibold text-zinc-600">
          {email}
        </span>
      </div>
      <button type="button" className="rounded-full">
        <LogOut className="h-8 w-8 rounded-md p-1 text-zinc-500 hover:bg-zinc-200" />
      </button>
    </div>
  )
}
