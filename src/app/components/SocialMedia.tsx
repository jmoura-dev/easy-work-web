import { Github, Linkedin, Palette } from 'lucide-react'
import Link from 'next/link'

export interface SocialMediaProps {
  linkedIn: string | null
  github: string | null
  portfolio: string | null
}

export function SocialMedia({ linkedIn, github, portfolio }: SocialMediaProps) {
  return (
    <div className="flex items-center justify-around gap-2">
      <Link
        href={linkedIn ?? '/error'}
        title="linkedIn"
        target="_blank"
        className="flex items-center justify-center gap-0.5 rounded-md bg-blue-500 px-2 py-1 text-sm font-semibold text-zinc-100 hover:bg-blue-600"
      >
        <Linkedin className="h-3 w-4 font-semibold" />
        LinkedIn
      </Link>
      <Link
        href={github ?? '/error'}
        title="github"
        target="_blank"
        className="flex items-center justify-center gap-1 rounded-md bg-zinc-500 px-2 py-1 text-sm font-semibold text-white hover:bg-zinc-600"
      >
        <Github className="h-4 w-4" />
        Github
      </Link>
      <Link
        href={portfolio ?? '/error'}
        title="portfolio"
        target="_blank"
        className="flex items-center justify-center gap-1 rounded-md bg-violet-600 px-2 py-1 text-sm font-semibold text-white hover:bg-violet-700"
      >
        <Palette className="h-4 w-4" />
        Portfolio
      </Link>
    </div>
  )
}
