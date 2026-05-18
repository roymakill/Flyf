'use client'

import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-[#0f172a] text-gray-300 border-t border-white/10 px-6 pt-12 pb-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Account */}
        <div>
          <h4 className="text-white font-semibold mb-3 uppercase tracking-wide">{t.footer.account}</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/register" className="flex items-center gap-1 hover:text-yellow-400">
                <ChevronRight className="w-4 h-4" /> {t.footer.register}
              </a>
            </li>
            <li>
              <a href="/login" className="flex items-center gap-1 hover:text-yellow-400">
                <ChevronRight className="w-4 h-4" /> {t.footer.login}
              </a>
            </li>
            <li>
              <a href="/download" className="flex items-center gap-1 hover:text-yellow-400">
                <ChevronRight className="w-4 h-4" /> {t.footer.downloadClient}
              </a>
            </li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h4 className="text-white font-semibold mb-3 uppercase tracking-wide">{t.footer.community}</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/forum" className="flex items-center gap-1 hover:text-yellow-400">
                <ChevronRight className="w-4 h-4" /> {t.footer.forum}
              </a>
            </li>
            <li>
              <a
                href="https://discord.gg/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-yellow-400"
              >
                <ChevronRight className="w-4 h-4" /> {t.footer.discord}
              </a>
            </li>
            <li>
              <a href="/rankings" className="flex items-center gap-1 hover:text-yellow-400">
                <ChevronRight className="w-4 h-4" /> {t.footer.rankings}
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-semibold mb-3 uppercase tracking-wide">{t.footer.support}</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/help" className="flex items-center gap-1 hover:text-yellow-400">
                <ChevronRight className="w-4 h-4" /> {t.footer.helpCenter}
              </a>
            </li>
            <li>
              <a href="/contact" className="flex items-center gap-1 hover:text-yellow-400">
                <ChevronRight className="w-4 h-4" /> {t.footer.contactUs}
              </a>
            </li>
            <li>
              <a href="/bug-report" className="flex items-center gap-1 hover:text-yellow-400">
                <ChevronRight className="w-4 h-4" /> {t.footer.bugReport}
              </a>
            </li>
          </ul>
        </div>

        {/* Logo & Info */}
        <div className="flex flex-col items-start md:items-center text-left md:text-center space-y-3">
          <Image
            src="/logo-optimized.webp"
            alt="Legion FlyFF Logo"
            width={110}
            height={110}
            className="object-contain drop-shadow-md"
          />
          <p className="text-sm text-gray-400">{t.footer.rights}</p>
          <p className="text-xs text-gray-500">{t.footer.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
