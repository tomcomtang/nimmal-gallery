import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MOA Garden Rooms',
  description: 'We create innovative, design-focused Garden Rooms. With a focus on quality and sustainability, our studios are handcrafted with you in mind.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
      </body>
    </html>
  )
} 