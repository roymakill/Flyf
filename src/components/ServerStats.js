'use client'

import { useEffect, useState } from 'react'
import { Server, Settings, Monitor, Cpu, HardDrive, MemoryStick, Signal, Gauge, Globe, Users as UsersIcon, Timer } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'

const EXP_RATE = process.env.NEXT_PUBLIC_EXP_RATE || 'Mid-High'
const PENYA_RATE = process.env.NEXT_PUBLIC_PENYA_RATE || 'High'
const DROP_RATE = process.env.NEXT_PUBLIC_DROP_RATE || 'Mid'

export default function ServerStats() {
  const { t } = useLanguage()
  const [dateTime, setDateTime] = useState(null)
  const [serverStatus, setServerStatus] = useState('online')
  const [playersOnline, setPlayersOnline] = useState(1247)
  const [loading, setLoading] = useState(true)

  // Keep this coarse so the whole stats panel does not re-render every second.
  useEffect(() => {
    setDateTime(new Date())
    const timer = setInterval(() => setDateTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  // Fetch server status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/server-status')
        const data = await res.json()

        if (data.success) {
          setServerStatus(data.status)
          setPlayersOnline(data.playersOnline)
        } else {
          setServerStatus('offline')
          setPlayersOnline(0)
        }
      } catch (error) {
        console.error('Failed to fetch server status:', error)
        setServerStatus('offline')
        setPlayersOnline(0)
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()

    // Refresh every 30 seconds
    const interval = setInterval(fetchStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  const timeString = dateTime
    ? dateTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    : '--:--'
  const dateString = dateTime
    ? dateTime.toLocaleDateString([], {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : 'Loading'

  const minimumRequirements = [
    { label: 'CPU', value: 'Intel Pentium G3420 or AMD Phenom II X2 550', icon: <Cpu className="w-4 h-4" /> },
    { label: 'GPU', value: 'NVIDIA GeForce 210 or AMD Radeon HD 5450', icon: <Monitor className="w-4 h-4" /> },
    { label: 'RAM', value: '2 GB RAM', icon: <MemoryStick className="w-4 h-4" /> },
    { label: 'Storage', value: '10 GB available space', icon: <HardDrive className="w-4 h-4" /> },
    { label: 'OS', value: 'Windows 10 64-bit', icon: <Settings className="w-4 h-4" /> },
    { label: 'DirectX', value: 'DirectX 11', icon: <Server className="w-4 h-4" /> }
  ]

  const recommendedRequirements = [
    { label: 'CPU', value: 'Intel Core i3-4130 or AMD FX-6300', icon: <Cpu className="w-4 h-4" /> },
    { label: 'GPU', value: 'NVIDIA GeForce GT 610 or AMD Radeon HD 6570', icon: <Monitor className="w-4 h-4" /> },
    { label: 'RAM', value: '4 GB RAM', icon: <MemoryStick className="w-4 h-4" /> },
    { label: 'Storage', value: '10 GB available space (SSD optional)', icon: <HardDrive className="w-4 h-4" /> },
    { label: 'OS', value: 'Windows 10 64-bit', icon: <Settings className="w-4 h-4" /> },
    { label: 'DirectX', value: 'DirectX 12', icon: <Server className="w-4 h-4" /> }
  ]

  return (
    <section className="py-10 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-blue-400 mb-1">{t.stats.title}</h2>
          <p className="text-sm text-gray-400">{t.stats.subtitle}</p>
        </div>

        {/* Compact status bar: solid colors, no gradients */}
        <div className="bg-gray-900 border border-blue-500 rounded-xl p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${serverStatus === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <Signal className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-white">{t.stats.live}</span>
            </div>
            <div className="flex flex-wrap items-center gap-6 sm:gap-8">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-400">{t.stats.status}</span>
                <span className={`text-sm font-semibold ${serverStatus === 'online' ? 'text-green-400' : 'text-red-400'}`}>
                  {serverStatus === 'online' ? t.stats.online : t.stats.offline}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <UsersIcon className="w-4 h-4 text-green-400" />
                <span className="text-xs text-gray-400">{t.stats.players}</span>
                <span className="text-sm font-semibold text-green-400">{playersOnline}</span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-semibold text-purple-400">{timeString}</span>
                <span className="text-xs text-gray-500">{dateString}</span>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-yellow-400" />
                <span className="text-xs text-yellow-400">{t.stats.uptime}</span>
                <span className="text-sm font-semibold text-yellow-400">99.9%</span>
              </div>
              <div className="border-l border-gray-600 pl-4 flex items-center gap-3">
                <span className="text-xs text-gray-500">{t.stats.rates}</span>
                <span className="text-xs text-blue-400 font-medium">EXP {EXP_RATE}</span>
                <span className="text-xs text-green-400 font-medium">Drop {DROP_RATE}</span>
                <span className="text-xs text-yellow-400 font-medium">Penya {PENYA_RATE}</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Requirements: solid backgrounds */}
        <div className="bg-gray-900 border border-blue-500/40 rounded-xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Monitor className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold text-blue-400">{t.stats.requirements}</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-bold text-yellow-500 uppercase tracking-wider mb-2">{t.stats.minimum}</h4>
              <div className="space-y-1.5">
                {minimumRequirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2 py-1.5 px-2 rounded bg-gray-800 border border-blue-500/30">
                    <span className="text-blue-400 shrink-0">{req.icon}</span>
                    <span className="text-gray-400 text-xs">{req.label}:</span>
                    <span className="text-blue-400 text-xs font-medium truncate">{req.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-green-500 uppercase tracking-wider mb-2">{t.stats.recommended}</h4>
              <div className="space-y-1.5">
                {recommendedRequirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2 py-1.5 px-2 rounded bg-gray-800 border border-green-500/30">
                    <span className="text-amber-400 shrink-0">{req.icon}</span>
                    <span className="text-gray-400 text-xs">{req.label}:</span>
                    <span className="text-amber-400 text-xs font-medium truncate">{req.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional stats: solid backgrounds */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-900 border border-blue-500/40 rounded-lg py-3 px-4 text-center">
            <div className="text-xl font-bold text-blue-400">89</div>
            <p className="text-xs text-gray-400">{t.stats.activeGuilds}</p>
          </div>
          <div className="bg-gray-900 border border-blue-500/40 rounded-lg py-3 px-4 text-center">
            <div className="text-xl font-bold text-amber-400">1,247</div>
            <p className="text-xs text-gray-400">{t.stats.peakToday}</p>
          </div>
          <div className="bg-gray-900 border border-blue-500/40 rounded-lg py-3 px-4 text-center">
            <div className="text-xl font-bold text-blue-400">15,892</div>
            <p className="text-xs text-gray-400">{t.stats.totalAccounts}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
