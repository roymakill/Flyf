'use client'

import { Languages } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'

export default function LanguageToggle({ compact = false }) {
  const { language, setLanguage } = useLanguage()
  const isThai = language === 'th'

  return (
    <button
      type="button"
      onClick={() => setLanguage(isThai ? 'en' : 'th')}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-amber-400 transition-colors ${
        compact ? 'px-3 py-2 text-xs' : 'px-4 py-2.5 text-sm'
      }`}
      aria-label={isThai ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
      title={isThai ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
    >
      <Languages size={compact ? 15 : 16} />
      <span className="font-semibold">{isThai ? 'TH' : 'EN'}</span>
    </button>
  )
}
