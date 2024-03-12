import './globals.css'
import { Inter } from 'next/font/google'
import AuthProvider from './context/AuthProvider'
import { options } from './api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import UserCard from '@/components/UserCard'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CamUNO',
  description: 'CamUNO By PATEL96',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(options);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <UserCard user={session?.user} />
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
