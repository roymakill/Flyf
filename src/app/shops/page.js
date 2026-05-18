'use client'

import { ShoppingCart, Percent, DollarSign, Gift, Star, AlertCircle, Search, Filter, Loader2, TrendingUp, Zap, Crown, Shield, Users, CheckCircle, Award, Heart, Eye, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const ITEMS_PER_PAGE = 10

const ItemCardSkeleton = () => (
  <div className="bg-gray-900 border border-gray-700/80 rounded-2xl overflow-hidden shadow-xl">
    <div className="relative h-64">
      <div className="absolute inset-0 bg-gray-800/80 rounded-t-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skeleton-shine"></div>
      </div>
    </div>
    <div className="p-5 space-y-4">
      <div>
        <div className="h-7 bg-gray-700/60 rounded-lg w-3/4 mb-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skeleton-shine"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-700/60 rounded w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skeleton-shine"></div>
          </div>
          <div className="h-4 bg-gray-700/60 rounded w-2/3 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skeleton-shine"></div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-9 bg-gray-700/60 rounded-lg w-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skeleton-shine"></div>
          </div>
          <div className="h-4 bg-gray-700/60 rounded w-28 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skeleton-shine"></div>
          </div>
        </div>
        <div className="h-10 bg-gray-700/60 rounded-xl w-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skeleton-shine"></div>
        </div>
      </div>
    </div>
  </div>
)

const ShopSkeleton = () => (
  <section className="min-h-screen bg-black/70 px-4 py-12 text-white relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('/bg-optimized.webp')] bg-cover bg-center opacity-20"></div>
    <div className="max-w-7xl mx-auto space-y-8 relative z-10 pt-24 sm:pt-28">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-12 w-12 bg-gray-700/60 rounded-xl relative overflow-hidden skeleton-shine" />
        <div className="space-y-2">
          <div className="h-6 bg-gray-700/60 rounded w-48 relative overflow-hidden skeleton-shine" />
          <div className="h-4 bg-gray-700/60 rounded w-64 relative overflow-hidden skeleton-shine" />
        </div>
      </div>
      <div className="flex flex-wrap gap-3 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-11 w-36 bg-gray-700/60 rounded-xl relative overflow-hidden skeleton-shine" />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <ItemCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </section>
)

// Enhanced SortDropdown component
const SortDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  const options = [
    { value: 'default', label: 'Featured', icon: Star },
    { value: 'price-low', label: 'Price: Low to High', icon: DollarSign },
    { value: 'price-high', label: 'Price: High to Low', icon: DollarSign },
    { value: 'points-high', label: 'Most Points', icon: Award },
    { value: 'sale', label: 'Best Deals', icon: Percent }
  ]

  const selectedOption = options.find(opt => opt.value === value)

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-5 py-2.5 bg-gray-900 border border-gray-700 rounded-xl hover:border-amber-500/40 transition-all min-w-[200px] justify-between text-left group"
      >
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-amber-500/20 rounded-lg">
            <Filter className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-sm font-semibold text-white">{selectedOption.label}</span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform text-gray-400 group-hover:text-amber-400 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full right-0 mt-2 w-[220px] bg-gray-900 rounded-xl shadow-2xl z-50 border border-gray-700 py-1.5">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => { onChange(option.value); setIsOpen(false) }}
                className={`flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-800/80 transition-colors rounded-lg mx-1.5 text-sm
                  ${value === option.value ? 'text-amber-400 bg-amber-500/10' : 'text-white'}`}
              >
                <div className="p-1.5 bg-amber-500/20 rounded-lg">
                  <option.icon className="w-4 h-4" />
                </div>
                <span className="font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function ItemMall() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [imageErrors, setImageErrors] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('default')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedUsername, setSelectedUsername] = useState('')
  const [attachment, setAttachment] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Enhanced filter states
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [pointsRange, setPointsRange] = useState({ min: '', max: '' })
  const [saleFilter, setSaleFilter] = useState({ onSale: false, regular: false })
  const [categoryFilter, setCategoryFilter] = useState('all')

  useEffect(() => {
    let mounted = true

    const fetchItems = async () => {
      try {
        setLoadingProgress(20)
        const res = await fetch('/api/topup')
        setLoadingProgress(50)
        const data = await res.json()
        setLoadingProgress(70)
        
        if (!res.ok) throw new Error(data.error || 'Failed to fetch items')
        if (mounted) {
          setItems(data)
          setLoadingProgress(90)
        }
      } catch (err) {
        console.error('Error fetching items:', err)
        if (mounted) {
          setError(err.message)
        }
      } finally {
        if (mounted) {
          setLoadingProgress(100)
          setLoading(false)
        }
      }
    }

    fetchItems()

    return () => {
      mounted = false
    }
  }, [])

  const calculateOriginalPrice = (price, salePercentage) => {
    return (price * 100) / (100 - salePercentage)
  }

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {})

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'cash':
        return <Heart className="w-5 h-5" />
      case 'vote':
        return <Star className="w-5 h-5" />
      case 'special':
        return <Gift className="w-5 h-5" />
      default:
        return <ShoppingCart className="w-5 h-5" />
    }
  }

  const sortItems = (items) => {
    switch (sortBy) {
      case 'price-low':
        return [...items].sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
      case 'price-high':
        return [...items].sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
      case 'points-high':
        return [...items].sort((a, b) => parseInt(b.points) - parseInt(a.points))
      case 'sale':
        return [...items].sort((a, b) => (b.is_on_sale ? b.sale_percentage : 0) - (a.is_on_sale ? a.sale_percentage : 0))
      default:
        return items
    }
  }

  const applyFilters = (items) => {
    return items.filter(item => {
      // Price range filter
      if (priceRange.min && parseFloat(item.price) < parseFloat(priceRange.min)) return false
      if (priceRange.max && parseFloat(item.price) > parseFloat(priceRange.max)) return false
      
      // Points range filter
      if (pointsRange.min && parseInt(item.points) < parseInt(pointsRange.min)) return false
      if (pointsRange.max && parseInt(item.points) > parseInt(pointsRange.max)) return false
      
      // Sale status filter
      if (saleFilter.onSale && !item.is_on_sale) return false
      if (saleFilter.regular && item.is_on_sale) return false
      
      return true
    })
  }

  const filteredItems = applyFilters(sortItems(
    activeCategory === 'all' 
      ? items 
      : items.filter(item => item.category === activeCategory)
  )).filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE))
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )
  const firstVisibleItem = filteredItems.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1
  const lastVisibleItem = Math.min(currentPage * ITEMS_PER_PAGE, filteredItems.length)

  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory, searchQuery, sortBy, priceRange.min, priceRange.max, pointsRange.min, pointsRange.max, saleFilter.onSale, saleFilter.regular])

  const clearFilters = () => {
    setPriceRange({ min: '', max: '' })
    setPointsRange({ min: '', max: '' })
    setSaleFilter({ onSale: false, regular: false })
    setSearchQuery('')
    setSortBy('default')
  }

  const getFilterCount = () => {
    let count = 0
    if (priceRange.min || priceRange.max) count++
    if (pointsRange.min || pointsRange.max) count++
    if (saleFilter.onSale || saleFilter.regular) count++
    if (searchQuery) count++
    if (sortBy !== 'default') count++
    return count
  }

  const handleTopupRequest = async (item) => {
    if (!selectedUsername) {
      Swal.fire({
        html: `
          <div class="bg-gray-900 p-6 rounded-2xl border border-gray-700 shadow-2xl">
            <div class="mb-4 p-4 bg-gray-800/80 rounded-xl border border-amber-500/30">
              <div class="flex justify-between items-center mb-4">
                <div class="flex items-center gap-2">
                  <div class="p-2 bg-amber-500/20 rounded-lg">
                    <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <span class="text-gray-100 font-medium">Package:</span>
                </div>
                <span class="text-amber-400 font-bold text-lg">${item.name}</span>
              </div>
              <div class="flex justify-between items-center mb-4">
                <div class="flex items-center gap-2">
                  <div class="p-2 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg">
                    <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <span class="text-gray-100 font-medium">Amount:</span>
                </div>
                <span class="text-amber-400 font-bold text-lg">₱${parseFloat(item.price).toFixed(2)}</span>
              </div>
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                  <div class="p-2 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-lg">
                    <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <span class="text-gray-100 font-medium">Value:</span>
                </div>
                <span class="text-amber-400 font-bold text-lg">${parseInt(item.points).toLocaleString()} Donate Points</span>
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Game Username
              </label>
              <input
                type="text"
                id="username"
                class="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 transition-all placeholder-gray-500 font-medium"
                placeholder="Enter your game username"
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Payment Proof
              </label>
              <div 
                id="dropZone"
                class="relative border-2 border-dashed border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:border-amber-500/50 hover:bg-gray-800/50 transition-all group bg-gray-800/50"
              >
                <input
                  type="file"
                  id="attachment"
                  accept="image/*,.pdf"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <!-- Upload State -->
                <div id="uploadState" class="space-y-3">
                  <div class="flex justify-center">
                    <div class="p-3 bg-amber-500/20 rounded-xl">
                      <svg class="w-8 h-8 text-amber-400 group-hover:text-amber-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                  </div>
                  <div class="text-sm">
                    <span class="text-amber-400 font-semibold">Click to upload</span> or drag and drop
                  </div>
                  <p class="text-xs text-gray-400">PNG, JPG, PDF up to 5MB</p>
                </div>
                
                <!-- File Preview State -->
                <div id="filePreview" class="hidden">
                  <div class="bg-white/20 p-4 rounded-xl border border-white/20">
                    <div class="flex items-center justify-between mb-3">
                      <h4 class="text-sm font-semibold text-amber-400">File Preview</h4>
                      <button
                        type="button"
                        id="removeFile"
                        class="text-gray-400 hover:text-red-400 transition-colors p-1 rounded hover:bg-white/10"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div class="flex items-center space-x-3 mb-3">
                      <div class="p-2 bg-amber-500/20 rounded-lg">
                        <svg class="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div class="text-left flex-1">
                        <p id="fileName" class="text-sm font-semibold text-white mb-1"></p>
                        <p id="fileSize" class="text-xs text-gray-400"></p>
                      </div>
                    </div>
                    
                    <div id="imagePreview" class="hidden">
                      <div class="relative w-full h-32 rounded-lg overflow-hidden border border-white/20">
                        <img id="previewImage" class="w-full h-full object-cover" alt="File preview" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                    </div>
                    
                    <div id="pdfPreview" class="hidden">
                      <div class="bg-gradient-to-br from-red-500/20 to-red-600/20 p-3 rounded-lg border border-red-500/30">
                        <div class="flex items-center gap-2">
                          <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <div>
                            <p class="text-sm font-semibold text-red-300">PDF Document</p>
                            <p class="text-xs text-gray-400">Click to view in new tab</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Re-upload hint -->
                    <div class="mt-3 p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                      <p class="text-xs text-amber-400 text-center">
                        <svg class="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Click anywhere to upload a different file
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-4">
              <label class="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  id="termsAgreement"
                  class="mt-1 rounded border-gray-600 bg-gray-800 text-amber-500 focus:ring-amber-500/50 focus:ring-2"
                />
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="text-sm font-semibold text-amber-400">Terms & Agreement</span>
                    <button
                      type="button"
                      id="viewTerms"
                      class="text-xs text-amber-400 hover:text-amber-300 underline transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                  <p class="text-xs text-gray-400">
                    I agree to the <span class="text-amber-400 font-semibold">Terms & Conditions</span> 
                    and understand that all donations are <span class="text-red-400 font-semibold">non-refundable</span>.
                  </p>
                </div>
              </label>
            </div>
            <p class="text-xs text-gray-400 text-center flex items-center justify-center gap-2">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Please upload a screenshot or photo of your payment for verification.
            </p>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Complete Purchase',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#d97706',
        background: 'rgba(0,0,0,0.9)',
        customClass: {
          popup: 'border border-gray-700 rounded-2xl bg-gray-900 shadow-2xl',
          title: 'text-white text-2xl font-bold',
          confirmButton: 'bg-amber-600 hover:bg-amber-500 text-white font-bold px-8 py-3 rounded-xl transition-all',
          cancelButton: 'bg-gray-700 hover:bg-gray-600 text-white font-bold px-8 py-3 rounded-xl transition-all'
        },
        didOpen: () => {
          const dropZone = document.getElementById('dropZone')
          const fileInput = document.getElementById('attachment')
          const filePreview = document.getElementById('filePreview')
          const fileName = document.getElementById('fileName')
          const fileSize = document.getElementById('fileSize')
          const removeFile = document.getElementById('removeFile')
          const viewTerms = document.getElementById('viewTerms')

          dropZone.addEventListener('dragover', (e) => {
            e.preventDefault()
            dropZone.classList.add('border-amber-400/50')
          })

          dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('border-amber-400/50')
          })

          dropZone.addEventListener('drop', (e) => {
            e.preventDefault()
            dropZone.classList.remove('border-amber-400/50')
            const file = e.dataTransfer.files[0]
            if (file) {
              handleFileSelect(file)
            }
          })

          fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0]
            if (file) {
              handleFileSelect(file)
            }
          })

          removeFile.addEventListener('click', () => {
            fileInput.value = ''
            filePreview.classList.add('hidden')
            document.getElementById('uploadState').classList.remove('hidden')
            document.getElementById('imagePreview').classList.add('hidden')
            document.getElementById('pdfPreview').classList.add('hidden')
            setAttachment(null)
          })

          viewTerms.addEventListener('click', () => {
            Swal.fire({
              title: 'Terms & Conditions',
              html: `
                <div class="bg-gray-900 p-6 rounded-2xl border border-gray-700 shadow-2xl">
                  <div class="space-y-6 text-left">
                    <div class="bg-gray-800/80 p-5 rounded-xl border border-amber-500/30">
                      <h3 class="text-base font-bold text-amber-400 mb-3 flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Donation Terms
                      </h3>
                      <div class="space-y-3 text-sm text-gray-300">
                        <div class="flex items-start gap-3">
                          <div class="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p>All donations are <span class="text-red-400 font-semibold">non-refundable</span> and final.</p>
                        </div>
                        <div class="flex items-start gap-3">
                          <div class="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p>Donation points will be credited to your account upon verification.</p>
                        </div>
                        <div class="flex items-start gap-3">
                          <div class="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p>Points cannot be returned or exchanged for cash.</p>
                        </div>
                        <div class="flex items-start gap-3">
                          <div class="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p>This transaction is legally binding and constitutes a final sale.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div class="bg-gray-800/80 p-5 rounded-xl border border-gray-600">
                      <h3 class="text-base font-bold text-amber-400 mb-3 flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        Important Notice
                      </h3>
                      <div class="space-y-4 text-sm text-gray-300">
                        <div class="flex items-start gap-3">
                          <div class="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p>Please ensure you have entered the correct game username before proceeding.</p>
                        </div>
                        <div class="flex items-start gap-3">
                          <div class="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p>Payment verification may take up to 24 hours during peak times.</p>
                        </div>
                        <div class="flex items-start gap-3">
                          <div class="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p>Contact support if you encounter any issues with your transaction.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div class="bg-gray-800/80 p-5 rounded-xl border border-gray-600">
                      <h3 class="text-base font-bold text-amber-400 mb-3 flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Privacy & Security
                      </h3>
                      <div class="space-y-4 text-sm text-gray-300">
                        <div class="flex items-start gap-3">
                          <div class="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p>Your payment information is encrypted and secure.</p>
                        </div>
                        <div class="flex items-start gap-3">
                          <div class="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p>We do not store sensitive payment details on our servers.</p>
                        </div>
                        <div class="flex items-start gap-3">
                          <div class="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p>Your personal information is protected under our privacy policy.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `,
              showConfirmButton: true,
              confirmButtonText: 'I Understand',
              background: 'rgba(0,0,0,0.9)',
              customClass: {
                popup: 'border border-gray-700 rounded-2xl bg-gray-900 shadow-2xl',
                title: 'text-amber-400 text-xl font-bold',
                confirmButton: 'bg-amber-600 hover:bg-amber-500 text-white font-bold px-6 py-2.5 rounded-xl transition-all'
              }
            })
          })

          function handleFileSelect(file) {
            if (file.size > 5 * 1024 * 1024) {
              Swal.showValidationMessage('File size must be less than 5MB')
              return
            }

            fileName.textContent = file.name
            fileSize.textContent = formatFileSize(file.size)
            
            // Switch to preview state
            document.getElementById('uploadState').classList.add('hidden')
            filePreview.classList.remove('hidden')
            setAttachment(file)

            // Handle file preview
            const imagePreview = document.getElementById('imagePreview')
            const pdfPreview = document.getElementById('pdfPreview')
            const previewImage = document.getElementById('previewImage')

            // Hide both previews initially
            imagePreview.classList.add('hidden')
            pdfPreview.classList.add('hidden')

            // Check file type and show appropriate preview
            if (file.type.startsWith('image/')) {
              // Image preview
              const reader = new FileReader()
              reader.onload = function(e) {
                previewImage.src = e.target.result
                imagePreview.classList.remove('hidden')
              }
              reader.readAsDataURL(file)
            } else if (file.type === 'application/pdf') {
              // PDF preview
              pdfPreview.classList.remove('hidden')
            }
          }

          function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes'
            const k = 1024
            const sizes = ['Bytes', 'KB', 'MB', 'GB']
            const i = Math.floor(Math.log(bytes) / Math.log(k))
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
          }
        },
        preConfirm: () => {
          const username = document.getElementById('username').value
          const attachmentInput = document.getElementById('attachment')
          const termsAgreement = document.getElementById('termsAgreement')
          
          if (!username) {
            Swal.showValidationMessage('Please enter your game username')
            return false
          }
          
          if (!attachmentInput.files[0]) {
            Swal.showValidationMessage('Please upload a payment proof')
            return false
          }
          
          if (!termsAgreement.checked) {
            Swal.showValidationMessage('You must agree to the terms and conditions to proceed')
            return false
          }
          
          setSelectedUsername(username)
          setAttachment(attachmentInput.files[0])
          return true
        }
      }).then((result) => {
        if (result.isConfirmed) {
          submitTopupRequest(item)
        }
      })
    } else {
      submitTopupRequest(item)
    }
  }

  const submitTopupRequest = async (item) => {
    setIsSubmitting(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('itemId', item.id)
      formData.append('username', selectedUsername)
      formData.append('attachment', attachment)

      const res = await fetch('/api/topup/request', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()

      if (res.ok) {
        Swal.fire({
          title: 'Purchase Successful!',
          html: `
            <div class="bg-gray-800/80 p-6 rounded-2xl border border-amber-500/30">
              <div class="flex justify-center mb-4">
                <div class="p-3 bg-amber-500/20 rounded-xl">
                  <svg class="w-10 h-10 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                </div>
              </div>
              <p class="text-gray-300 mb-4 text-center text-sm">Your purchase has been submitted and is being processed.</p>
              <div class="bg-gray-900/80 p-4 rounded-xl border border-gray-700">
                <p class="text-xs text-gray-400 mb-1">Package: <span class="text-amber-400 font-semibold">${item.name}</span></p>
                <p class="text-xs text-gray-400 mb-1">Username: <span class="text-amber-400 font-semibold">${selectedUsername}</span></p>
                <p class="text-xs text-gray-400">Points: <span class="text-amber-400 font-semibold">${item.points.toLocaleString()} Donate Points</span></p>
              </div>
            </div>
          `,
          icon: 'success',
          confirmButtonText: 'Continue Shopping',
          background: 'rgba(0,0,0,0.9)',
          customClass: {
            popup: 'border border-amber-500/30 rounded-2xl bg-gray-900',
            title: 'text-amber-400 text-xl font-bold',
            confirmButton: 'bg-amber-600 hover:bg-amber-500 text-white font-bold px-6 py-3 rounded-xl transition-all'
          }
        })
        setSelectedUsername('')
        setAttachment(null)
      } else {
        throw new Error(data.error || 'Failed to submit request')
      }
    } catch (err) {
      setError(err.message)
      Swal.fire({
        title: 'Purchase Failed',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'Try Again',
        background: 'rgba(0,0,0,0.9)',
        customClass: {
          popup: 'border border-red-500/40 rounded-2xl bg-gray-900',
          title: 'text-red-400 text-xl font-bold',
          confirmButton: 'bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-xl transition-all'
        }
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <>
        <ShopSkeleton />
        <div className="fixed bottom-6 left-6 bg-gray-900 rounded-xl p-4 border border-gray-700">
          <div className="text-sm text-white mb-2 font-medium">Loading packages... {Math.round(loadingProgress)}%</div>
          <div className="w-56 h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <section className="min-h-screen bg-black/70 px-4 py-20 text-white flex items-center justify-center relative overflow-hidden pt-24 sm:pt-28">
        <div className="absolute inset-0 bg-[url('/bg-optimized.webp')] bg-cover bg-center opacity-20" />
        <div className="bg-gray-900 rounded-2xl p-8 border border-red-500/40 max-w-lg w-full text-center relative z-10">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-red-500/20 rounded-xl">
              <AlertCircle className="w-10 h-10 text-red-400" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-red-400 mb-3">Connection Error</h2>
          <p className="text-gray-300 mb-6 text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl font-semibold transition-all"
          >
            Retry Connection
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-black/70 px-4 py-12 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/bg-optimized.webp')] bg-cover bg-center opacity-20" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10 pt-24 sm:pt-28">
        {/* Compact Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/20 border border-amber-500/30 rounded-xl">
              <ShoppingBag className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Top-Up</h1>
              <p className="text-sm text-gray-400">Recharge with donate points</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-amber-400" /> Secure
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" /> Fast
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-400" /> Support
            </span>
            <span className="flex items-center gap-1.5">
              <Crown className="w-4 h-4 text-amber-400" /> Bonuses
            </span>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          <div className="flex flex-wrap items-center gap-3 order-1 lg:order-none">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all bg-gray-900 border border-gray-700 hover:border-amber-500/40 relative`}
            >
              <Filter className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-semibold text-white">Filters</span>
              {getFilterCount() > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {getFilterCount()}
                </span>
              )}
            </button>
            <SortDropdown value={sortBy} onChange={setSortBy} />
            {getFilterCount() > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-3 py-2 text-xs text-gray-400 hover:text-amber-400 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear
              </button>
            )}
          </div>
          <div className="relative flex-1 order-2 lg:order-none min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search packages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl py-2.5 pl-9 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 text-sm font-medium"
            />
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-amber-400" /> Price
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 text-sm"
                  />
                  <span className="text-gray-500">–</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-400" /> Points
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={pointsRange.min}
                    onChange={(e) => setPointsRange(prev => ({ ...prev, min: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
                  />
                  <span className="text-gray-500">–</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={pointsRange.max}
                    onChange={(e) => setPointsRange(prev => ({ ...prev, max: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-red-400" /> Type
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={saleFilter.onSale}
                      onChange={(e) => setSaleFilter(prev => ({ ...prev, onSale: e.target.checked }))}
                      className="rounded border-gray-600 bg-gray-800 text-amber-500 focus:ring-amber-500/50"
                    />
                    <span className="text-xs text-gray-300">On Sale</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={saleFilter.regular}
                      onChange={(e) => setSaleFilter(prev => ({ ...prev, regular: e.target.checked }))}
                      className="rounded border-gray-600 bg-gray-800 text-amber-500 focus:ring-amber-500/50"
                    />
                    <span className="text-xs text-gray-300">Regular</span>
                  </label>
                </div>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
                >
                  Apply <Filter className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2
              ${activeCategory === 'all'
                ? 'bg-amber-600 text-white border border-amber-500 shadow-lg shadow-amber-500/20'
                : 'bg-gray-900 border border-gray-700 text-white hover:border-amber-500/40'}`}
          >
            <ShoppingCart className="w-4 h-4" />
            All
          </button>
          {Object.keys(groupedItems).map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2
                ${activeCategory === category
                  ? 'bg-amber-600 text-white border border-amber-500 shadow-lg shadow-amber-500/20'
                  : 'bg-gray-900 border border-gray-700 text-white hover:border-amber-500/40'}`}
            >
              {getCategoryIcon(category)}
              {category === 'cash' ? 'Donate' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-gray-800 bg-gray-900/70 px-4 py-3">
          <p className="text-sm text-gray-400">
            Showing <span className="font-semibold text-amber-400">{firstVisibleItem}-{lastVisibleItem}</span> of{' '}
            <span className="font-semibold text-white">{filteredItems.length}</span> items
          </p>
          <p className="text-xs text-gray-500">
            10 items per page for faster loading
          </p>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {paginatedItems.map((item) => (
            <div
              key={item.id}
              className="group bg-gray-900 border border-gray-700/80 rounded-xl overflow-hidden hover:border-amber-500/40 transition-all duration-300 h-full flex flex-col"
            >
              <div className="relative flex-shrink-0">
                {item.is_on_sale && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-md font-bold flex items-center gap-1 z-10">
                    <Percent size={10} /> {item.sale_percentage}% OFF
                  </div>
                )}
                {parseInt(item.points) > 2000 && (
                  <div className="absolute top-2 right-2 bg-amber-600 text-white text-xs px-2 py-0.5 rounded-md font-bold flex items-center gap-1 z-10">
                    <TrendingUp size={10} /> Popular
                  </div>
                )}
                <div className="relative h-40 overflow-hidden">
                  {imageErrors[item.id] ? (
                    <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                      <span className="text-5xl">💎</span>
                    </div>
                  ) : item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      onError={() => setImageErrors(prev => ({ ...prev, [item.id]: true }))}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                      <span className="text-5xl">💎</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <div className="flex-1 min-h-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h2 className="text-base font-bold text-white line-clamp-1">{item.name}</h2>
                    <span className="text-xs text-gray-500 flex-shrink-0 flex items-center gap-0.5">
                      <Eye className="w-3 h-3" /> Premium
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-3">{item.description}</p>
                </div>

                <div className="mt-auto">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-lg font-bold text-amber-400">
                        ₱{parseFloat(item.price).toFixed(2)}
                      </span>
                      {item.is_on_sale && (
                        <span className="text-xs text-gray-500 line-through">
                          ₱{calculateOriginalPrice(item.price, item.sale_percentage).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleTopupRequest(item)}
                      disabled={isSubmitting}
                      className="bg-amber-600 hover:bg-amber-500 text-white px-3 py-1.5 rounded-lg font-semibold text-sm transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                    >
                      {isSubmitting ? (
                        <><Loader2 size={12} className="animate-spin" /> Processing</>
                      ) : (
                        <><ShoppingCart size={12} /> Purchase</>
                      )}
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">
                      {item.is_on_sale ? `Save ₱${(calculateOriginalPrice(item.price, item.sale_percentage) - parseFloat(item.price)).toFixed(2)}` : 'Best value'}
                    </span>
                    <span className="text-amber-400 font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {parseInt(item.points).toLocaleString()} pts
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-700 bg-gray-900 text-sm font-semibold text-white hover:border-amber-500/50 hover:text-amber-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-700 disabled:hover:text-white transition-colors"
            >
              Previous
            </button>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-xl text-sm font-bold transition-colors ${
                    currentPage === page
                      ? 'bg-amber-600 text-white border border-amber-500'
                      : 'bg-gray-900 text-gray-300 border border-gray-700 hover:border-amber-500/50 hover:text-amber-400'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-700 bg-gray-900 text-sm font-semibold text-white hover:border-amber-500/50 hover:text-amber-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-700 disabled:hover:text-white transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes skeleton-shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .skeleton-shine {
          animation: skeleton-shine 1.5s infinite;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
