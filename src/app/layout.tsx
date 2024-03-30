import './globals.css'
import { Inter } from 'next/font/google'
import AuthProvider from './context/AuthProvider'
import { options } from './api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import UserCard from '@/components/UserCard'
import SocketProvider from './context/SocketProvider'
import { GameIdProvider } from './context/GameIdProvider'

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
          <SocketProvider>
            <GameIdProvider>
              <UserCard user={session?.user} />
              <main>
                {children}
              </main>
            </GameIdProvider>
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
