'use client'

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
    <button type="button" onClick={logout}>
      Sair
    </button>
  )
}
