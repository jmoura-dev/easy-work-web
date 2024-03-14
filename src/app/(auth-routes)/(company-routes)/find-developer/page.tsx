import { FindDeveloperForm } from '@/app/components/FindDeveloperForm'

export default async function FindDeveloper() {
  return (
    <div className="px-6 md:px-10 lg:px-20">
      <h1 className="mb-10 text-center font-mirza text-2xl font-semibold text-zinc-800 lg:text-3xl 2xl:text-4xl">
        Com o filtro avançado, você encontra o talento perfeito para seu negócio
      </h1>

      <FindDeveloperForm />
    </div>
  )
}
