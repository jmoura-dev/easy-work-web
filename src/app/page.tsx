import Link from 'next/link'
import { Header } from './components/Header'
import { SectionClient } from './components/SectionClient'
import { SectionDeveloper } from './components/SectionDeveloper'

export default function Home() {
  return (
    <>
      <Header />
      <div className="m-auto flex max-w-screen-xl flex-col gap-5 pb-2">
        <h1 className="m-auto mt-5 max-w-3xl px-4 text-base font-semibold text-zinc-600 lg:my-5 lg:text-lg">
          Seja você um cliente procurando por desenvolvedores qualificados ou um
          desenvolvedor em busca da oportunidade perfeita,{' '}
          <span className="font-bold text-green-700">
            nós temos o que você precisa.
          </span>
        </h1>

        <SectionDeveloper />
        <SectionClient />

        <div className="my-4 flex flex-col gap-3 px-4">
          <h2 className="border-b border-zinc-400 pb-1 font-mirza text-2xl font-semibold text-zinc-600">
            Nossa missão
          </h2>
          <p className="font-semibold text-zinc-700">
            Oferecer uma plataforma que conecta desenvolvedores a oportunidades
            significativas, esperamos contribuir para o avanço da tecnologia e
            impulsionar o desenvolvimento econômico e social. Estamos
            comprometidos em criar um impacto positivo na vida dos
            desenvolvedores e na comunidade em geral.
          </p>
        </div>

        <footer className="mt-5 flex flex-col items-center gap-3">
          <Link
            href="/signUp"
            className="flex w-44 justify-center rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500"
          >
            Cadastre-se já!
          </Link>
          <span className="mt-3 text-xs font-semibold text-zinc-600">
            &copy; Desenvolvido por{' '}
            <Link
              href="https://www.linkedin.com/in/jackson-moura-a43350246/"
              target="_blank"
              className="border-b border-zinc-500 text-zinc-800"
            >
              Jackson Moura
            </Link>
          </span>
        </footer>
      </div>
    </>
  )
}
