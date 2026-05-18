'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'

export default function Spinner() {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Simulate a delay to fade out spinner once everything loads
    const timer = setTimeout(() => {
      setFadeOut(true)
    }, 1500) // fade after 1.5s or adjust as needed

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-700 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <Image
        src="/logo-optimized.webp"
        alt="Legion Flyff Logo"
        width={100}
        height={100}
        className="mb-6 animate-pulse"
      />
      <Loader2 className="h-10 w-10 text-yellow-400 animate-spin mb-4" />
              <p className="text-yellow-300 text-sm tracking-wide animate-fade-in">Loading Legion Flyff...</p>
    </div>
  )
}
