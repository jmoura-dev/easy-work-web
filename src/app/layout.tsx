import type { Metadata } from 'next'
import { Inter, Mirza } from 'next/font/google'
import './globals.css'
import NextAuthSessionProvider from '@/providers/sessionProvider'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'
import { TechnologiesContextProvider } from '@/providers/technologiesProvider'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const inter = Inter({ subsets: ['latin'] })
const mirza = Mirza({
  subsets: ['latin'],
  variable: '--font-mirza',
  weight: ['400', '600', '700'],
})

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
    <html lang="en" className={(inter.className, mirza.variable)}>
      <body className="light antialiased">
        <NextAuthSessionProvider>
          <TechnologiesContextProvider>
            <ToastContainer />
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </TechnologiesContextProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
