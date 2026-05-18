'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'legionflyff_language'

const dictionaries = {
  en: {
    nav: {
      home: 'Home',
      download: 'Download',
      rankings: 'Rankings',
      shops: 'Shops',
      menu: 'Menu',
      account: 'Account',
      login: 'Login',
      register: 'Register',
      profile: 'My Profile',
      admin: 'Admin Panel',
      logout: 'Logout',
    },
    home: {
      headlinePrefix: 'The Ultimate',
      headlineAccent: 'Experience',
      description: 'Classic FlyFF meets modern Madrigal.',
      descriptionHighlight: 'Legion Flyff',
      descriptionSuffix: 'balanced PvP, custom dungeons, thriving community.',
      serverRates: 'Server rates',
      expRate: 'Mid EXP Rate',
      penyaRate: 'Mid Penya Rate',
      dropRate: 'Mid Drop Rate',
      downloadNow: 'Download Now',
      createAccount: 'Create Account',
      scroll: 'Scroll to explore',
      why: 'Why',
      balancedRates: 'Balanced rates',
      balancedRatesDesc: 'Mid-High EXP, High Penya, Mid Drop',
      pvpDungeons: 'PvP & dungeons',
      pvpDungeonsDesc: 'Fair PvP, custom dungeons, bosses',
      activeCommunity: 'Active community',
      activeCommunityDesc: 'Events, Discord, 24/7',
      roadmap: 'V15 & roadmap',
      roadmapDesc: 'Latest client, content phases',
      getClient: 'Get the client',
      featuresTitle: 'Server Features',
      featuresDesc: 'What makes Legion Flyff the most advanced FlyFF private server.',
    },
    stats: {
      title: 'Server Statistics',
      subtitle: 'Status, rates & system requirements',
      live: 'Live',
      status: 'Status',
      online: 'Online',
      offline: 'Offline',
      players: 'Players',
      uptime: 'Uptime',
      rates: 'Rates:',
      requirements: 'System Requirements',
      minimum: 'Minimum',
      recommended: 'Recommended',
      activeGuilds: 'Active Guilds',
      peakToday: 'Peak Today',
      totalAccounts: 'Total Accounts',
    },
    footer: {
      account: 'Account',
      community: 'Community',
      support: 'Support',
      register: 'Register',
      login: 'Login',
      downloadClient: 'Download Client',
      forum: 'Forum',
      discord: 'Discord',
      rankings: 'Rankings',
      helpCenter: 'Help Center',
      contactUs: 'Contact Us',
      bugReport: 'Bug Report',
      rights: '© 2025 Legion FlyFF. All rights reserved.',
      tagline: 'A community-driven MMORPG experience',
    },
  },
  th: {
    nav: {
      home: 'หน้าหลัก',
      download: 'ดาวน์โหลด',
      rankings: 'อันดับ',
      shops: 'ร้านค้า',
      menu: 'เมนู',
      account: 'บัญชี',
      login: 'เข้าสู่ระบบ',
      register: 'สมัครสมาชิก',
      profile: 'โปรไฟล์ของฉัน',
      admin: 'แผงผู้ดูแล',
      logout: 'ออกจากระบบ',
    },
    home: {
      headlinePrefix: 'สุดยอด',
      headlineAccent: 'ประสบการณ์',
      description: 'FlyFF คลาสสิกผสาน Madrigal ยุคใหม่',
      descriptionHighlight: 'Legion Flyff',
      descriptionSuffix: 'PvP สมดุล ดันเจี้ยนพิเศษ และคอมมูนิตี้คึกคัก',
      serverRates: 'เรทเซิร์ฟเวอร์',
      expRate: 'เรท EXP ระดับกลาง',
      penyaRate: 'เรท Penya ระดับกลาง',
      dropRate: 'เรท Drop ระดับกลาง',
      downloadNow: 'ดาวน์โหลดเลย',
      createAccount: 'สร้างบัญชี',
      scroll: 'เลื่อนเพื่อดูต่อ',
      why: 'ทำไมต้อง',
      balancedRates: 'เรทสมดุล',
      balancedRatesDesc: 'EXP กลาง-สูง, Penya สูง, Drop กลาง',
      pvpDungeons: 'PvP และดันเจี้ยน',
      pvpDungeonsDesc: 'PvP ยุติธรรม ดันเจี้ยนพิเศษ และบอส',
      activeCommunity: 'คอมมูนิตี้คึกคัก',
      activeCommunityDesc: 'กิจกรรม Discord และออนไลน์ 24/7',
      roadmap: 'V15 และแผนอัปเดต',
      roadmapDesc: 'ไคลเอนต์ล่าสุด พร้อมคอนเทนต์เป็นช่วง',
      getClient: 'รับตัวเกม',
      featuresTitle: 'ฟีเจอร์เซิร์ฟเวอร์',
      featuresDesc: 'สิ่งที่ทำให้ Legion Flyff เป็นเซิร์ฟเวอร์ FlyFF ส่วนตัวที่ทันสมัย',
    },
    stats: {
      title: 'สถิติเซิร์ฟเวอร์',
      subtitle: 'สถานะ เรท และสเปกเครื่องที่แนะนำ',
      live: 'สด',
      status: 'สถานะ',
      online: 'ออนไลน์',
      offline: 'ออฟไลน์',
      players: 'ผู้เล่น',
      uptime: 'เวลาทำงาน',
      rates: 'เรท:',
      requirements: 'สเปกเครื่อง',
      minimum: 'ขั้นต่ำ',
      recommended: 'แนะนำ',
      activeGuilds: 'กิลด์ที่ใช้งาน',
      peakToday: 'สูงสุดวันนี้',
      totalAccounts: 'บัญชีทั้งหมด',
    },
    footer: {
      account: 'บัญชี',
      community: 'คอมมูนิตี้',
      support: 'ช่วยเหลือ',
      register: 'สมัครสมาชิก',
      login: 'เข้าสู่ระบบ',
      downloadClient: 'ดาวน์โหลดตัวเกม',
      forum: 'ฟอรัม',
      discord: 'Discord',
      rankings: 'อันดับ',
      helpCenter: 'ศูนย์ช่วยเหลือ',
      contactUs: 'ติดต่อเรา',
      bugReport: 'แจ้งปัญหา',
      rights: '© 2025 Legion FlyFF สงวนลิขสิทธิ์',
      tagline: 'ประสบการณ์ MMORPG ที่ขับเคลื่อนโดยคอมมูนิตี้',
    },
  },
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(STORAGE_KEY)
    if (savedLanguage === 'th' || savedLanguage === 'en') {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
    window.localStorage.setItem(STORAGE_KEY, language)
  }, [language])

  const value = useMemo(() => ({
    language,
    setLanguage,
    t: dictionaries[language],
  }), [language])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider')
  }
  return context
}
