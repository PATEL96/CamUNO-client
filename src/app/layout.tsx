import './globals.css'
import { Inter } from 'next/font/google'
import AuthProvider from './context/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CamUNO',
  description: 'CamUNO By PATEL96',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {/* <Navbar /> */}
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
