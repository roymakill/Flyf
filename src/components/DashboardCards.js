'use client'

import { useEffect, useState } from 'react'
import { CountUp } from 'use-count-up'
import { DollarSign, CreditCard, BarChart2, Users, ChevronRight } from 'lucide-react'
import AccountTiles from '@/components/AccountTiles'
import AccountLists from '@/components/AccountLists'
import 'tippy.js/dist/tippy.css'
import { useRouter } from 'next/navigation'

export default function DashboardCards({ sidebarBottom }) {
  const [accountCount, setAccountCount] = useState(0)
  const router = useRouter()
  useEffect(() => {
    const fetchAccountCount = async () => {
      try {
        const res = await fetch('/api/accounts', { credentials: 'include' })
        const data = await res.json()
        if (res.ok && Array.isArray(data.accounts)) {
          setAccountCount(data.accounts.length)
        }
      } catch (err) {
        console.error('Failed to fetch account count', err)
      }
    }

    fetchAccountCount()
  }, [])

  const stats = [
    {
      title: 'GCash Donations',
      value: 0,
      icon: DollarSign,
      prefix: '₱ ',
      sub: '0 transactions',
      route: '/transactions/gcash'
    },
    {
      title: 'PayPal Donations',
      value: 0,
      icon: CreditCard,
      prefix: '€ ',
      sub: '0 transactions',
      route: '/transactions/paypal'
    },
    {
      title: 'Vote Activity',
      value: 0,
      icon: BarChart2,
      prefix: '',
      sub: 'Total votes',
      route: '/transactions/votelogs'
    },
    {
      title: 'Game Accounts',
      value: accountCount,
      icon: Users,
      prefix: '',
      sub: `${accountCount} linked account${accountCount !== 1 ? 's' : ''}`,
      route: '/profile'
    }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left sidebar: Shortcuts, then optional content (e.g. Security Settings) below */}
      <div className="lg:col-span-3 order-2 lg:order-1 space-y-6">
        <div className="bg-gray-900 border border-amber-500/30 rounded-2xl shadow-xl overflow-hidden sticky top-24">
          <div className="px-4 py-3 border-b border-gray-700/80">
            <h2 className="text-sm font-bold text-white">Shortcuts</h2>
            <p className="text-xs text-gray-500 mt-0.5">Donations & activity</p>
          </div>
          <div className="p-3 space-y-2">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <button
                  key={stat.title}
                  type="button"
                  onClick={() => router.push(stat.route)}
                  className="group w-full flex items-center gap-3 p-3 rounded-xl bg-gray-800/80 border border-gray-700 hover:border-amber-500/40 hover:bg-gray-800 text-left transition-all"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-gray-400 truncate">{stat.title}</p>
                    <p className="text-sm font-bold text-white">
                      <CountUp isCounting end={stat.value} duration={1.5} prefix={stat.prefix || ''} />
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-amber-400 flex-shrink-0" />
                </button>
              )
            })}
          </div>
        </div>
        {sidebarBottom && <div>{sidebarBottom}</div>}
      </div>

      {/* Main area: Create Account on top, Game Accounts below */}
      <div className="lg:col-span-9 order-1 lg:order-2 space-y-6">
        <div>
          <AccountTiles />
        </div>
        <div>
          <AccountLists />
        </div>
      </div>
    </div>
  )
}
