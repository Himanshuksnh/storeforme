"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { ShoppingBag, Star, ArrowRight, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

interface Offer {
  id: string
  title: string
  description: string
  discount: string
  expiryDate: any
  image?: string
}

const fallbackOffers = [
  {
    id: "1",
    title: "Special Diwali Offer",
    description: "Get 20% off on all pooja items and decorative items",
    discount: "20% OFF",
    expiryDate: { toDate: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
  },
  {
    id: "2",
    title: "Saree Collection Sale",
    description: "Beautiful sarees starting from ₹999 only",
    discount: "Up to 50% OFF",
    expiryDate: { toDate: () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) },
  },
  {
    id: "3",
    title: "Kirana Combo Deal",
    description: "Buy groceries worth ₹500 and get 10% discount",
    discount: "10% OFF",
    expiryDate: { toDate: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
  },
]

const categories = [
  { name: "Pooja Items", icon: "🪔", color: "bg-orange-100 text-orange-800" },
  { name: "Sarees", icon: "👘", color: "bg-pink-100 text-pink-800" },
  { name: "Clothing", icon: "👕", color: "bg-blue-100 text-blue-800" },
  { name: "Cosmetics", icon: "💄", color: "bg-purple-100 text-purple-800" },
  { name: "Kirana", icon: "🛒", color: "bg-green-100 text-green-800" },
]

export default function HomePage() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOffers()
  }, [])

  const fetchOffers = async () => {
    try {
      if (!db) {
        console.warn("Firestore not available, using fallback data")
        setOffers(fallbackOffers.slice(0, 3))
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
        setOffers(fallbackOffers.slice(0, 3))
      } else {
        setOffers(offersData.slice(0, 3))
      }
    } catch (error) {
      console.error("Error fetching offers:", error)
      setOffers(fallbackOffers.slice(0, 3))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 to-pink-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 animate-bounce" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">Harshita General & Kirana Store</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">Your One-Stop Shop for Everything You Need</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
              >
                Shop Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 transform hover:scale-105 transition-all duration-200"
              >
                <Phone className="mr-2 w-5 h-5" />
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <Link key={category.name} href={`/products?category=${encodeURIComponent(category.name)}`}>
                <Card className="hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold text-gray-800 mb-2">{category.name}</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${category.color}`}>Explore</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Current Offers Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Current Offers</h2>
            <Link href="/offers">
              <Button variant="outline" className="hover:bg-orange-50">
                View All Offers <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : offers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {offers.map((offer) => (
                <Card
                  key={offer.id}
                  className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-orange-500"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <Star className="w-5 h-5 text-yellow-500 mr-2" />
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm font-semibold">
                        {offer.discount}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-gray-800">{offer.title}</h3>
                    <p className="text-gray-600 mb-4">{offer.description}</p>
                    <p className="text-sm text-gray-500">
                      Valid till: {offer.expiryDate?.toDate?.()?.toLocaleDateString() || "N/A"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">No current offers available</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Quick Contact Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-100 to-pink-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Visit Our Store</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <Phone className="w-8 h-8 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">Get in touch for any queries</p>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Phone className="mr-2 w-4 h-4" />
                  Call Now
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <MapPin className="w-8 h-8 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Find Us</h3>
                <p className="text-gray-600 mb-4">Visit our physical store</p>
                <Link href="/contact">
                  <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                    <MapPin className="mr-2 w-4 h-4" />
                    Get Directions
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
