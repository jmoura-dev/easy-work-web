import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Sidebar } from './components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="antialiased">
      <body className={inter.className}>
        <div className="grid min-h-screen grid-rows-body lg:grid-cols-body">
          <Sidebar />
          <main className="px-4 pb-12 pt-24 row-start-2 lg:col-start-2">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
