import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/ui/Navbar'
import CustomCursor from '@/components/ui/CustomCursor'
import Loader from '@/components/ui/Loader'

export const metadata: Metadata = {
  title: 'LucenEdge — Engineering Intelligent Systems',
  description: 'AI-first technology company engineering intelligent systems for modern enterprises. Every service is AI-powered, human-refined.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        <Loader />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
