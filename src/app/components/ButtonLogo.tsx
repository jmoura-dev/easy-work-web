import Link from 'next/link'

export function ButtonLogo() {
  return (
    <Link
      href="/"
      className="flex w-16 flex-col font-mirza text-2xl font-semibold text-violet-500"
    >
      <span>Easy</span>
      <span className="-mt-4 ml-3">Work</span>
    </Link>
  )
}
