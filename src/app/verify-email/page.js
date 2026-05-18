'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

function VerifyEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [verificationStatus, setVerificationStatus] = useState({
    loading: true,
    success: false,
    message: ''
  })
  const [email, setEmail] = useState('')
  const [resendStatus, setResendStatus] = useState('')
  const [alreadyVerified, setAlreadyVerified] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [retryTimer, setRetryTimer] = useState(3)
  const maxRetries = 3
  const [isRetrying, setIsRetrying] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return;
    const token = searchParams.get('token');
    if (!token) return; // Don't run if token is not present

    let retryTimeout;
    let countdownInterval;
    let cancelled = false;

    const verifyEmail = async () => {
      try {
        setIsRetrying(false)
        setRetryTimer(3)
        console.log('Starting verification with token:', token)
        const response = await fetch(`/api/verify-email?token=${token}`)
        const data = await response.json()

        // Check if the response indicates already verified
        if (data.success && data.message && data.message.toLowerCase().includes('already verified')) {
          setAlreadyVerified(true)
          setVerificationStatus({
            loading: false,
            success: true,
            message: data.message || 'Email already verified. You can now login.'
          })
          setRetryCount(0)
          return
        }

        // Check if the response indicates success
        if (data.success) {
          setVerificationStatus({
            loading: false,
            success: true,
            message: data.message || 'Email verified successfully! You can now login.'
          })
          setRetryCount(0)
          setTimeout(() => {
            router.push('/login')
          }, 2000)
        } else {
          // Only retry for errors that are not invalid/expired token
          const errorMsg = data.error || ''
          if (
            retryCount < maxRetries &&
            !errorMsg.toLowerCase().includes('invalid') &&
            !errorMsg.toLowerCase().includes('expired')
          ) {
            setIsRetrying(true)
            setVerificationStatus({
              loading: true,
              success: false,
              message: errorMsg + ' Retrying in ' + retryTimer + ' seconds... (Attempt ' + (retryCount + 1) + ' of ' + maxRetries + ')'
            })
            let seconds = 3
            setRetryTimer(seconds)
            countdownInterval = setInterval(() => {
              seconds--
              setRetryTimer(seconds)
              setVerificationStatus(prev => ({
                ...prev,
                message: errorMsg + ' Retrying in ' + seconds + ' seconds... (Attempt ' + (retryCount + 1) + ' of ' + maxRetries + ')'
              }))
              if (seconds <= 0) {
                clearInterval(countdownInterval)
              }
            }, 1000)
            retryTimeout = setTimeout(() => {
              if (!cancelled) setRetryCount(c => c + 1)
            }, 3000)
            return
          } else {
            setVerificationStatus({
              loading: false,
              success: false,
              message: errorMsg || 'Verification failed. Please try again.'
            })
            setRetryCount(0)
          }
        }
      } catch (error) {
        if (
          retryCount < maxRetries
        ) {
          setIsRetrying(true)
          setVerificationStatus({
            loading: true,
            success: false,
            message: 'An error occurred. Retrying in ' + retryTimer + ' seconds... (Attempt ' + (retryCount + 1) + ' of ' + maxRetries + ')'
          })
          let seconds = 3
          setRetryTimer(seconds)
          countdownInterval = setInterval(() => {
            seconds--
            setRetryTimer(seconds)
            setVerificationStatus(prev => ({
              ...prev,
              message: 'An error occurred. Retrying in ' + seconds + ' seconds... (Attempt ' + (retryCount + 1) + ' of ' + maxRetries + ')'
            }))
            if (seconds <= 0) {
              clearInterval(countdownInterval)
            }
          }, 1000)
          retryTimeout = setTimeout(() => {
            if (!cancelled) setRetryCount(c => c + 1)
          }, 3000)
          return
        } else {
          setVerificationStatus({
            loading: false,
            success: false,
            message: 'An error occurred during verification. Please try again.'
          })
          setRetryCount(0)
        }
      }
    }

    verifyEmail()

    return () => {
      cancelled = true
      if (retryTimeout) clearTimeout(retryTimeout)
      if (countdownInterval) clearInterval(countdownInterval)
    }
  }, [hydrated, searchParams, router, retryCount])

  const handleResendVerification = async () => {
    if (!email) {
      setResendStatus('Please enter your email address.')
      return
    }

    try {
      setResendStatus('Sending verification email...')
      const response = await fetch('/api/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()
      
      if (response.ok && data && data.success === true) {
        setResendStatus('✓ ' + data.message)
        setTimeout(() => setResendStatus(''), 3000)
      } else {
        setResendStatus('✗ ' + (data?.error || 'Failed to send verification email.'))
      }
    } catch (error) {
      console.error('Resend verification error:', error)
      setResendStatus('✗ An error occurred. Please try again.')
    }
  }

  if (!hydrated || !searchParams.get('token')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url('/bg-optimized.webp')` }}>
        <div className="w-full max-w-md bg-black/80 backdrop-blur-sm p-6 rounded-lg flex flex-col items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-yellow-500 border-t-transparent rounded-full"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
         style={{ backgroundImage: `url('/bg-optimized.webp')` }}>
      <div className="w-full max-w-md bg-black/80 backdrop-blur-sm p-6 rounded-lg">
        <h1 className="text-2xl text-yellow-400 font-bold text-center mb-4">
          Email Verification
        </h1>

        {verificationStatus.loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-yellow-500 border-t-transparent rounded-full"></div>
            {isRetrying && (
              <div className="text-yellow-400 text-center mt-4">
                {verificationStatus.message}
              </div>
            )}
          </div>
        ) : verificationStatus.success ? (
          <div className="text-center">
            <div className="text-green-400 text-6xl mb-3">✓</div>
            <h2 className="text-xl text-green-400 font-semibold mb-2">
              Verification Successful!
            </h2>
            <p className="text-gray-300">
              {verificationStatus.message}
            </p>
            <p className="text-gray-400 mt-2 text-sm">
              Redirecting to login page...
            </p>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-[#ff6b6b] text-6xl mb-3">✗</div>
            <h2 className="text-xl text-[#ff6b6b] font-semibold mb-2">
              Verification Failed
            </h2>
            <p className="text-gray-300 mb-6">
              {verificationStatus.message}
            </p>

            <div className="space-y-4">
              <h3 className="text-yellow-400 font-semibold">
                Need a new verification link?
              </h3>
              
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-2.5 bg-black/50 border border-gray-700 rounded text-white placeholder-gray-500"
              />

              <button
                onClick={handleResendVerification}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2.5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!email}
              >
                Resend Verification Email
              </button>

              {resendStatus && (
                <p className={`text-sm mt-2 ${resendStatus.startsWith('✓') ? 'text-green-400' : 'text-red-400'}`}>
                  {resendStatus}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailContent />
    </Suspense>
  )
}
