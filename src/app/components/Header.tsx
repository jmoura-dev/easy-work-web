import Link from 'next/link'
import { ButtonLogo } from './ButtonLogo'

export function Header() {
  return (
    <header className="m-auto flex h-20 max-w-screen-2xl items-center justify-between border-b px-4">
      <ButtonLogo />

      <div className="flex items-center gap-5">
        <Link href="/signIn" className="text-sm font-semibold text-zinc-700">
          Conecte-se
        </Link>
        <Link
          href="/signUp"
          className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500"
        >
          Inscrever-se
        </Link>
      </div>
    </header>
  )
}
