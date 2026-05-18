"use client";

import CommunitySection from "@/components/Classes";
import Footer from "@/components/Footer";
import ServerStats from "@/components/ServerStats";
import { useLanguage } from "@/lib/i18n";
import Image from "next/image";
import {
  Download,
  UserPlus,
  ArrowDownToLine,
  Star,
  Shield,
  Zap,
  Users,
  Bot,
  Building2,
  Car,
  Hammer,
  Shield as ShieldIcon,
  Search,
  Users as UsersIcon,
  Palette,
  BookOpen,
  RotateCcw,
  ShoppingCart,
  Store,
  Database,
  Trophy,
  Zap as ZapIcon,
  Star as StarIcon,
  Crown as CrownIcon,
  Target as TargetIcon,
  Shield as ShieldIcon2,
  Map,
  Users2,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  const { t } = useLanguage();
  const advancedFeatures = [
    { icon: <Bot className="w-6 h-6" />, title: "AI Farming", description: "Automated farming in Azria for Penya", category: "Automation" },
    { icon: <Building2 className="w-6 h-6" />, title: "Heaven Tower B5", description: "Red Chips farming in Heaven Tower", category: "Dungeon" },
    { icon: <Hammer className="w-6 h-6" />, title: "Weapon Fusion", description: "Fuse weapons to create powerful equipment", category: "Crafting" },
    { icon: <ShieldIcon className="w-6 h-6" />, title: "Auto-Invasion", description: "Automatic invasion system for guilds", category: "PvP" },
    { icon: <Search className="w-6 h-6" />, title: "Monster Hunting", description: "Monster Album and hunting system", category: "PvE" },
    { icon: <Star className="w-6 h-6" />, title: "VIP System", description: "Exclusive benefits for VIP members", category: "Premium" },
    { icon: <Map className="w-6 h-6" />, title: "Teleporter", description: "Instant teleportation system", category: "Utility" },
    { icon: <UsersIcon className="w-6 h-6" />, title: "Guild Finder", description: "Find and join guilds easily", category: "Social" },
    { icon: <Users2 className="w-6 h-6" />, title: "Party Finder", description: "Find parties for dungeons and raids", category: "Social" },
    { icon: <Palette className="w-6 h-6" />, title: "Pet Aura Changer", description: "Customize your pet appearance", category: "Customization" },
    { icon: <Sparkles className="w-6 h-6" />, title: "Glow Changer", description: "Change weapon and armor glow effects", category: "Customization" },
    { icon: <BookOpen className="w-6 h-6" />, title: "Daily Quest", description: "Daily quests with rewards", category: "PvE" },
    { icon: <Database className="w-6 h-6" />, title: "Monster Database", description: "Comprehensive monster information", category: "Utility" },
    { icon: <RotateCcw className="w-6 h-6" />, title: "Recycle System", description: "Recycle items for materials", category: "Crafting" },
    { icon: <ShoppingCart className="w-6 h-6" />, title: "Cash/Vote Shop", description: "Premium items and vote rewards", category: "Shop" },
    { icon: <Store className="w-6 h-6" />, title: "Offline Vendor", description: "365 days offline vending system", category: "Economy" },
    { icon: <Trophy className="w-6 h-6" />, title: "FFA/TDM", description: "Free-for-all and Team Deathmatch modes", category: "PvP" },
    { icon: <ZapIcon className="w-6 h-6" />, title: "Anarchy System", description: "Advanced PvP mechanics", category: "PvP" },
    { icon: <StarIcon className="w-6 h-6" />, title: "Ultimate Stats", description: "Enhanced character statistics", category: "Progression" },
    { icon: <CrownIcon className="w-6 h-6" />, title: "Rarity System", description: "Item rarity and quality system", category: "Progression" },
    { icon: <TargetIcon className="w-6 h-6" />, title: "Boss Mechanics", description: "Enhanced boss fight mechanics", category: "PvE" },
    { icon: <ShieldIcon2 className="w-6 h-6" />, title: "Guild Buff", description: "Guild-wide buffs and bonuses", category: "Guild" },
  ];

  const getCategoryColor = (category) => {
    const map = {
      Automation: "from-green-500 to-emerald-500",
      Dungeon: "from-purple-500 to-pink-500",
      Customization: "from-blue-500 to-cyan-500",
      Crafting: "from-yellow-500 to-orange-500",
      PvP: "from-red-500 to-pink-500",
      PvE: "from-green-500 to-teal-500",
      Premium: "from-yellow-500 to-amber-500",
      Utility: "from-gray-500 to-slate-500",
      Social: "from-indigo-500 to-purple-500",
      Shop: "from-emerald-500 to-green-500",
      Economy: "from-amber-500 to-yellow-500",
      Progression: "from-violet-500 to-purple-500",
      Guild: "from-orange-500 to-red-500",
    };
    return map[category] || "from-blue-500 to-cyan-500";
  };

  return (
    <>
      {/* Hero – centered, minimal; background is the star */}
      <section id="home" className="relative w-full min-h-screen flex flex-col overflow-hidden text-white">
        <Image
          src="/bg-optimized.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        {/* Light vignette only – background stays visible */}
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_100%_80%_at_50%_50%,transparent_30%,rgba(0,0,0,0.4)_80%,rgba(0,0,0,0.7)_100%)]" aria-hidden />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" aria-hidden />

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12 min-h-screen">
          <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-5 text-center">
            {/* Logo with lightning effect */}
            <div className="relative inline-flex items-center justify-center">
              {/* Strong electric blue lightning aura */}
              <div
                className="absolute inset-0 -m-10 rounded-full pointer-events-none animate-logo-lightning-flash"
                style={{
                  background: "radial-gradient(ellipse 85% 75% at 50% 50%, rgba(0,212,255,0.6) 0%, rgba(0,220,255,0.35) 25%, rgba(0,200,255,0.15) 50%, transparent 70%)",
                  boxShadow: "0 0 80px rgba(0,212,255,0.5), 0 0 120px rgba(0,212,255,0.25), inset 0 0 60px rgba(0,212,255,0.15)",
                }}
                aria-hidden
              />
              {/* Diagonal lightning streaks */}
              <div className="absolute inset-0 -m-6 pointer-events-none overflow-visible" aria-hidden>
                <div className="absolute left-[5%] top-[20%] w-16 h-0.5 rotate-[-25deg] animate-lightning-bolt bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent" style={{ boxShadow: "0 0 10px rgba(0,212,255,0.9), 0 0 20px rgba(0,212,255,0.5)" }} />
                <div className="absolute right-[5%] top-[25%] w-14 h-0.5 rotate-[28deg] animate-lightning-bolt bg-gradient-to-r from-transparent via-white to-transparent" style={{ boxShadow: "0 0 10px rgba(0,212,255,0.9), 0 0 20px rgba(0,212,255,0.5)", animationDelay: "0.5s" }} />
                <div className="absolute left-[15%] bottom-[15%] w-12 h-0.5 rotate-[-15deg] animate-lightning-strike bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent" style={{ boxShadow: "0 0 12px rgba(0,212,255,0.9)", animationDelay: "0.3s" }} />
                <div className="absolute right-[12%] bottom-[18%] w-14 h-0.5 rotate-[18deg] animate-lightning-strike bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent" style={{ boxShadow: "0 0 12px rgba(0,212,255,0.9)", animationDelay: "0.7s" }} />
              </div>
              {/* Horizontal lightning – left */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-0.5 -translate-x-3 pointer-events-none animate-lightning-bolt bg-gradient-to-r from-transparent via-white to-[#00D4FF] shadow-[0_0_12px_rgba(0,212,255,0.9),0_0_24px_rgba(0,212,255,0.5)]" aria-hidden />
              {/* Horizontal lightning – right */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-0.5 translate-x-3 pointer-events-none animate-lightning-bolt bg-gradient-to-l from-transparent via-white to-[#00D4FF] shadow-[0_0_12px_rgba(0,212,255,0.9),0_0_24px_rgba(0,212,255,0.5)]" style={{ animationDelay: "0.6s" }} aria-hidden />
              {/* Lightning – below logo */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-32 h-0.5 pointer-events-none animate-lightning-bolt bg-gradient-to-r from-transparent via-white to-transparent" style={{ boxShadow: "0 0 16px rgba(0,212,255,0.9), 0 0 32px rgba(0,212,255,0.5)", animationDelay: "0.35s" }} aria-hidden />
              <div className="absolute inset-0 -m-6 rounded-full bg-gradient-to-br from-amber-500/20 via-transparent to-[#00D4FF]/20 blur-3xl animate-logo-legion-ring pointer-events-none" aria-hidden />
              <div
                className="absolute w-[120%] h-[140%] rounded-full opacity-60 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,175,55,0.25) 0%, rgba(0,212,255,0.1) 40%, transparent 70%)",
                  filter: "blur(20px)",
                  animation: "logo-legion-ring 3s ease-in-out infinite",
                }}
                aria-hidden
              />
              <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none" aria-hidden>
                <div className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-12deg] animate-logo-legion-shine" />
              </div>
              <Image
                src="/logo-optimized.webp"
                alt="Legion Flyff"
                width={360}
                height={220}
                priority
                sizes="(max-width: 640px) 280px, 360px"
                className="relative z-10 w-full max-w-[360px] h-auto object-contain animate-logo-legion-pulse animate-logo-legion-float"
              />
            </div>

            {/* Headline + description */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                {t.home.headlinePrefix} <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 bg-clip-text text-transparent">{t.home.headlineAccent}</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto leading-snug">
                {t.home.description} <span className="font-semibold text-amber-400">{t.home.descriptionHighlight}</span> — {t.home.descriptionSuffix}
              </p>
            </div>

            {/* Server rates */}
            <div className="w-full max-w-md rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 p-3">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">{t.home.serverRates}</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center gap-1 py-1.5 rounded-lg bg-[#00D4FF]/10 border border-[#00D4FF]/20">
                  <Zap className="w-4 h-4 text-[#00D4FF]" />
                  <span className="text-[11px] font-medium text-slate-300">{t.home.expRate}</span>
                </div>
                <div className="flex flex-col items-center gap-1 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span className="text-[11px] font-medium text-slate-300">{t.home.penyaRate}</span>
                </div>
                <div className="flex flex-col items-center gap-1 py-1.5 rounded-lg bg-[#00D4FF]/10 border border-[#00D4FF]/20">
                  <Users className="w-4 h-4 text-[#00D4FF]" />
                  <span className="text-[11px] font-medium text-slate-300">{t.home.dropRate}</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-2 justify-center">
              <a
                href="/download"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white text-sm bg-gradient-to-r from-[#0099CC] to-[#00D4FF] border border-[#00D4FF]/50 shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_28px_rgba(0,212,255,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <ArrowDownToLine className="w-4 h-4" />
                {t.home.downloadNow}
              </a>
              <a
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white text-sm bg-amber-500 border-2 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:bg-amber-400 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <UserPlus className="w-4 h-4" />
                {t.home.createAccount}
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-slate-400 text-xs">
          <span>{t.home.scroll}</span>
          <div className="w-px h-5 bg-gradient-to-b from-slate-400 to-transparent rounded-full animate-pulse" aria-hidden />
        </div>
      </section>

      <ServerStats />

      {/* Why Legion Flyff */}
      <section className="py-12 bg-[#08080c] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {t.home.why} <span className="text-amber-400">Legion Flyff</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { icon: Zap, title: t.home.balancedRates, desc: t.home.balancedRatesDesc, accent: "border-l-[#00D4FF]" },
              { icon: Shield, title: t.home.pvpDungeons, desc: t.home.pvpDungeonsDesc, accent: "border-l-amber-500" },
              { icon: Users2, title: t.home.activeCommunity, desc: t.home.activeCommunityDesc, accent: "border-l-[#00D4FF]" },
              { icon: Star, title: t.home.roadmap, desc: t.home.roadmapDesc, accent: "border-l-amber-500" },
            ].map((item) => (
              <div
                key={item.title}
                className={`group flex gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/10 border-l-4 ${item.accent} hover:bg-white/[0.06] transition-all duration-200`}
              >
                <div className="shrink-0 w-8 h-8 rounded-md bg-white/5 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-amber-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-white text-sm mb-0.5">{item.title}</h3>
                  <p className="text-[11px] text-slate-400 leading-tight">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <a
              href="/download"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-amber-500 hover:bg-amber-400 transition-colors border border-amber-400/30"
            >
              <Download className="w-3.5 h-3.5" />
              {t.home.getClient}
            </a>
          </div>
        </div>
      </section>


      {/* Features */}
      <section className="py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-amber-400 mb-1">
              {t.home.featuresTitle}
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              {t.home.featuresDesc}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {advancedFeatures.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-lg p-3 hover:border-amber-500/30 transition-all duration-200"
              >
                <div
                  className={`w-8 h-8 bg-gradient-to-br ${getCategoryColor(feature.category)} rounded-md flex items-center justify-center mb-2 text-white`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xs font-bold text-amber-400 mb-0.5">{feature.title}</h3>
                <p className="text-[11px] text-slate-400 mb-1.5 line-clamp-2 leading-tight">{feature.description}</p>
                <span className="inline-block px-1.5 py-0.5 bg-amber-500/15 text-amber-300 text-[10px] rounded border border-amber-500/25">
                  {feature.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CommunitySection />
      <Footer />
    </>
  );
}
