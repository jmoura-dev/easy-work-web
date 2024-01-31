import { Sidebar } from '../components/Sidebar'

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-screen grid-rows-body justify-center bg-violet-50 lg:grid-cols-body">
      <Sidebar />
      <main className="row-start-2 min-h-screen overflow-x-hidden bg-violet-50 px-4 pb-12 pt-24 lg:col-start-2">
        {children}
      </main>
    </div>
  )
}
