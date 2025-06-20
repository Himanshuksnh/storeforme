"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Star, Calendar, Tag } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface Offer {
  id: string
  title: string
  description: string
  discount: string
  expiryDate: any
  image?: string
  category?: string
  terms?: string
}

// Add this fallback data at the top of the component, after the imports
const fallbackOffers = [
  {
    id: "1",
    title: "Festival Special - Diwali Bonanza",
    description:
      "Get amazing discounts on all pooja items, decorative lights, and festive essentials. Perfect time to prepare for the festival of lights!",
    discount: "25% OFF",
    expiryDate: { toDate: () => new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) },
    category: "Pooja Items",
    terms: "Valid on minimum purchase of ₹500. Cannot be combined with other offers.",
  },
  {
    id: "2",
    title: "Saree Collection Mega Sale",
    description:
      "Discover our exclusive collection of silk, cotton, and designer sarees at unbeatable prices. Limited time offer!",
    discount: "Up to 50% OFF",
    expiryDate: { toDate: () => new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) },
    category: "Sarees",
    terms: "Offer valid on selected sarees only. While stocks last.",
  },
  {
    id: "3",
    title: "Kirana Combo Deal",
    description:
      "Stock up on daily essentials with our special combo offers. Get more value for your money on groceries and household items.",
    discount: "15% OFF",
    expiryDate: { toDate: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
    category: "Kirana",
    terms: "Valid on combo purchases above ₹1000. Free home delivery included.",
  },
  {
    id: "4",
    title: "Beauty & Cosmetics Bonanza",
    description:
      "Pamper yourself with premium cosmetics and beauty products at discounted rates. All major brands available.",
    discount: "30% OFF",
    expiryDate: { toDate: () => new Date(Date.now() + 20 * 24 * 60 * 60 * 1000) },
    category: "Cosmetics",
    terms: "Valid on cosmetics and beauty products only. Offer cannot be clubbed.",
  },
  {
    id: "5",
    title: "Clothing Clearance Sale",
    description:
      "Refresh your wardrobe with our latest collection of clothing for men, women, and children at amazing prices.",
    discount: "40% OFF",
    expiryDate: { toDate: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
    category: "Clothing",
    terms: "Final sale items. No exchanges or returns. Limited sizes available.",
  },
  {
    id: "6",
    title: "Weekend Special Offer",
    description:
      "Special weekend discounts on all categories. Perfect time to shop for your weekly needs and save money.",
    discount: "20% OFF",
    expiryDate: { toDate: () => new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) },
    category: "All Categories",
    terms: "Valid only on weekends. Minimum purchase of ₹300 required.",
  },
]

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOffers()
  }, [])

  // Replace the fetchOffers function with:
  const fetchOffers = async () => {
    try {
      if (!db) {
        console.warn("Firestore not available, using fallback data")
        setOffers(fallbackOffers)
        return
      }

      const offersRef = collection(db, "offers")
      const currentDate = new Date()
      const q = query(offersRef, where("expiryDate", ">", currentDate))
      const querySnapshot = await getDocs(q)

      const offersData: Offer[] = []
      querySnapshot.forEach((doc) => {
        offersData.push({ id: doc.id, ...doc.data() } as Offer)
      })

      if (offersData.length === 0) {
        setOffers(fallbackOffers)
      } else {
        // Sort by expiry date (closest first)
        offersData.sort((a, b) => {
          const dateA = a.expiryDate?.toDate?.() || new Date()
          const dateB = b.expiryDate?.toDate?.() || new Date()
          return dateA.getTime() - dateB.getTime()
        })
        setOffers(offersData)
      }
    } catch (error) {
      console.error("Error fetching offers:", error)
      setOffers(fallbackOffers)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A"
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const getDaysRemaining = (timestamp: any) => {
    if (!timestamp) return null
    const expiryDate = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    const today = new Date()
    const diffTime = expiryDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Current Offers</h1>
          <p className="text-lg text-gray-600">Don't miss out on these amazing deals!</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-32 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : offers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer) => {
              const daysRemaining = getDaysRemaining(offer.expiryDate)
              const isExpiringSoon = daysRemaining !== null && daysRemaining <= 7

              return (
                <Card
                  key={offer.id}
                  className={`hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden ${
                    isExpiringSoon ? "ring-2 ring-red-400 ring-opacity-50" : ""
                  }`}
                >
                  {offer.image && (
                    <div className="relative h-48 overflow-hidden">
                      <Image src={offer.image || "/placeholder.svg"} alt={offer.title} fill className="object-cover" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          {offer.discount}
                        </span>
                      </div>
                      {isExpiringSoon && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold animate-pulse">
                            Ending Soon!
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <CardContent className="p-6">
                    {!offer.image && (
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Star className="w-5 h-5 text-yellow-500 mr-2" />
                          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-bold">
                            {offer.discount}
                          </span>
                        </div>
                        {isExpiringSoon && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">
                            Ending Soon!
                          </span>
                        )}
                      </div>
                    )}

                    <h3 className="font-bold text-xl mb-3 text-gray-800">{offer.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{offer.description}</p>

                    {offer.category && (
                      <div className="flex items-center mb-3">
                        <Tag className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-500">{offer.category}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Valid till: {formatDate(offer.expiryDate)}</span>
                      </div>
                      {daysRemaining !== null && (
                        <span className={`font-semibold ${isExpiringSoon ? "text-red-600" : "text-green-600"}`}>
                          {daysRemaining} days left
                        </span>
                      )}
                    </div>

                    {offer.terms && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600">
                          <strong>Terms:</strong> {offer.terms}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">No Current Offers</h2>
              <p className="text-gray-500">Check back soon for exciting deals and discounts!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
