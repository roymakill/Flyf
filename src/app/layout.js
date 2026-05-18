import './globals.css'
import { Geist, Geist_Mono } from 'next/font/google'
import ClientLayout from '../components/ClientLayout'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata = {
  title: 'Legion FlyFF - Ultimate Private Server Experience',
  description: 'Join Legion FlyFF, a high-quality Flyff private server featuring balanced PvP, custom dungeons, modern systems, and an active community. Play now and relive the magic of Madrigal!',
  keywords: [
    'FlyFF Private Server',
    'Legion FlyFF',
    'Free MMORPG',
    'Play Flyff Online',
    'Fly For Fun Server',
    'Legion Flyff Registration',
    'Best Flyff Server 2025',
    'v15 Flyff Private Server',
    'Legion Game Features',
    'Flyff PvP Server'
  ],
  openGraph: {
    title: 'Legion FlyFF - Fly For Fun Reimagined',
    description: 'Experience Legion FlyFF with premium events, PvP battles, classic v15 mechanics, and a vibrant player base. The Ultimate Experience!',
    url: 'https://www.legionflyff.com',
    siteName: 'Legion FlyFF',
    images: [
      {
        url: 'https://www.legionflyff.com/og-banner.jpg', // replace with actual banner URL
        width: 1200,
        height: 630,
        alt: 'Legion FlyFF Official Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legion FlyFF - The Ultimate Experience!',
    description: 'Get ready to soar in Legion FlyFF. Play with friends, earn rewards, and conquer Madrigal.',
    site: '@LegionFlyFF',
    creator: '@LegionFlyFF',
    images: ['https://www.legionflyff.com/twitter-card.jpg'], // optional custom image
  },
  metadataBase: new URL('https://www.legionflyff.com'),
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-white`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
