'use client'

import { useState } from 'react'
import { Calendar, Clock, User, ArrowRight, Star, Trophy, Gift, Users } from 'lucide-react'

export default function News() {
  const [activeTab, setActiveTab] = useState('news')

  const newsItems = [
    {
      id: 1,
      type: 'news',
      title: 'Legion Flyff Grand Opening Event',
      excerpt: 'Join us for the official launch of Legion Flyff! Special rewards, events, and celebrations await all players.',
      content: 'The highly anticipated Legion Flyff is finally here! We\'ve been working tirelessly to bring you the ultimate FlyFF experience with enhanced graphics, balanced gameplay, and a thriving community. To celebrate this momentous occasion, we\'re hosting a grand opening event with exclusive rewards, special dungeons, and amazing prizes for all participants.',
      date: '2025-01-15',
      author: 'Legion Team',
      category: 'Event',
      image: '/promo1.png',
      featured: true
    },
    {
      id: 2,
      type: 'news',
      title: 'New Custom Dungeon: Shadow Realm',
      excerpt: 'Explore the mysterious Shadow Realm dungeon with unique bosses and exclusive loot.',
      content: 'Venture into the depths of the Shadow Realm, a brand new custom dungeon designed exclusively for Legion Flyff. Face challenging bosses, solve intricate puzzles, and claim exclusive rewards that can only be found in this mysterious realm. The dungeon features unique mechanics and requires teamwork to conquer.',
      date: '2025-01-10',
      author: 'Game Master',
      category: 'Update',
      image: '/promo2.png',
      featured: false
    },
    {
      id: 3,
      type: 'news',
      title: 'PvP Balance Update Released',
      excerpt: 'Major balance changes implemented to ensure fair and competitive PvP combat.',
      content: 'We\'ve implemented comprehensive balance changes to ensure that all classes have a fighting chance in PvP combat. The update includes skill adjustments, damage rebalancing, and new mechanics that promote strategic gameplay while maintaining the excitement of player vs player combat.',
      date: '2025-01-08',
      author: 'Balance Team',
      category: 'Update',
      image: '/promo3.png',
      featured: false
    },
    {
      id: 4,
      type: 'event',
      title: 'Guild Wars Championship',
      excerpt: 'Compete in the ultimate guild vs guild tournament with massive prizes.',
      content: 'The Guild Wars Championship is here! Form your strongest guild and compete against other teams in epic battles for territory control and massive rewards. The tournament features multiple rounds, special rules, and exclusive rewards for the winning guild.',
      date: '2025-01-20',
      author: 'Event Team',
      category: 'Tournament',
      image: '/promo4.png',
      featured: true
    },
    {
      id: 5,
      type: 'event',
      title: 'Double EXP Weekend',
      excerpt: 'Enjoy double experience rates during this special weekend event.',
      content: 'Level up faster with our Double EXP Weekend event! All players will receive double experience from monsters, quests, and activities. Perfect for new players to catch up or veterans to reach new heights.',
      date: '2025-01-25',
      author: 'Event Team',
      category: 'Event',
      image: '/promo5.png',
      featured: false
    },
    {
      id: 6,
      type: 'update',
      title: 'New Class Skills Implemented',
      excerpt: 'Each class receives new powerful skills and abilities.',
      content: 'We\'ve added new skills for all classes to enhance gameplay and provide more strategic options. Each class now has access to unique abilities that complement their playstyle and role in the game.',
      date: '2025-01-05',
      author: 'Development Team',
      category: 'Update',
      image: '/promo6.png',
      featured: false
    }
  ]

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Event': return <Gift className="w-4 h-4" />
      case 'Tournament': return <Trophy className="w-4 h-4" />
      case 'Update': return <Star className="w-4 h-4" />
      default: return <Calendar className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Event': return 'text-dreamer-gold'
      case 'Tournament': return 'text-red-400'
      case 'Update': return 'text-dreamer-blue'
      default: return 'text-gray-400'
    }
  }

  const filteredNews = newsItems.filter(item => 
    activeTab === 'all' ? true : item.type === activeTab
  )

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dreamer-blue mb-4">
            Latest News & Events
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stay updated with the latest news, events, and updates from Legion Flyff. 
            Never miss an important announcement or exciting event.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-black/40 backdrop-blur-sm border border-blue-500/20 rounded-xl p-2">
            {[
              { id: 'all', label: 'All', icon: <Users className="w-4 h-4" /> },
              { id: 'news', label: 'News', icon: <Calendar className="w-4 h-4" /> },
              { id: 'event', label: 'Events', icon: <Gift className="w-4 h-4" /> },
              { id: 'update', label: 'Updates', icon: <Star className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-blue-500/20'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item) => (
            <article key={item.id} className="group relative">
              <div className="bg-black/40 backdrop-blur-sm border border-blue-500/20 rounded-xl overflow-hidden hover:border-blue-500/40 transition-all duration-300 hover:transform hover:scale-105">
                {/* Featured Badge */}
                {item.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Featured
                    </div>
                  </div>
                )}

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`${getCategoryColor(item.category)}`}>
                      {getCategoryIcon(item.category)}
                    </div>
                    <span className={`text-sm font-semibold ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-dreamer-blue mb-3 group-hover:text-dreamer-gold transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {item.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {item.author}
                    </div>
                  </div>

                  {/* Read More Button */}
                  <button className="flex items-center gap-2 text-dreamer-blue hover:text-dreamer-gold transition-colors duration-300 group">
                    <span className="font-semibold">Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="btn-dreamer-primary px-8 py-4 font-bold rounded-xl text-white flex items-center gap-3 text-lg mx-auto">
            <Calendar className="w-6 h-6" />
            View All News & Events
          </button>
        </div>
      </div>
    </section>
  )
}
