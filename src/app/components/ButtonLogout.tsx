'use client'

import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function ButtonLogout() {
  const router = useRouter()

  async function logout() {
    const confirm = window.confirm('Deseja mesmo sair?')

    if (confirm) {
      await signOut({
        redirect: false,
      })

      router.replace('/')
    }
  }

  return (
    <button type="button" className="rounded-full" onClick={logout}>
      <LogOut className="h-8 w-8 rounded-md p-1 text-zinc-500 hover:bg-zinc-200" />
    </button>
  )
}
