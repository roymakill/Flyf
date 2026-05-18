'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LanguageProvider } from '@/lib/i18n'
export default function ClientLayout({ children }) {
  const pathname = usePathname()

  return (
    <LanguageProvider>
      <Navbar />
      {pathname !== '/profile' && 
      pathname !== '/transactions/gcash' && 
      pathname !== '/transactions/paypal' && 
      pathname !== '/transactions/votelogs' 
      }
      <ToastContainer position="top-center" theme="dark" autoClose={3000} />
      <main>{children}</main>
    </LanguageProvider>
  )
}
