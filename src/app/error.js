'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <section
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
      style={{ backgroundImage: `url('/bg-optimized.webp')` }}
    >
      <div className="max-w-xl mx-auto text-center">
        <div className="bg-[#0f1c2e]/95 border-2 border-yellow-500/30 backdrop-blur-md p-8 rounded-2xl shadow-[0_0_15px_rgba(234,179,8,0.2)]">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">Something went wrong!</h1>
          
          <p className="text-gray-300 mb-8">
            Don't worry! Our best mages are working on fixing this issue.
          </p>

          <div className="space-x-4">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold px-6 py-3 rounded-xl transition-all shadow-lg"
            >
              Try again
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 