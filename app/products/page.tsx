"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useCart } from "@/contexts/cart-context"
import { ShoppingCart, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

interface Product {
  id: string
  name: string
  category: string
  price?: number
  description: string
  image?: string
  inStock: boolean
}

// Add this fallback data at the top of the component, after the imports
const fallbackProducts = [
  {
    id: "1",
    name: "Brass Diya Set",
    category: "Pooja Items",
    price: 299,
    description: "Beautiful brass diyas for festivals and daily pooja",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
  },
  {
    id: "2",
    name: "Silk Saree",
    category: "Sarees",
    price: 2999,
    description: "Elegant silk saree perfect for special occasions",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
  },
  {
    id: "3",
    name: "Cotton T-Shirt",
    category: "Clothing",
    price: 499,
    description: "Comfortable cotton t-shirt for daily wear",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
  },
  {
    id: "4",
    name: "Face Cream",
    category: "Cosmetics",
    price: 199,
    description: "Moisturizing face cream for all skin types",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
  },
  {
    id: "5",
    name: "Basmati Rice 5kg",
    category: "Kirana",
    price: 450,
    description: "Premium quality basmati rice",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
  },
  {
    id: "6",
    name: "Incense Sticks",
    category: "Pooja Items",
    price: 50,
    description: "Fragrant incense sticks for pooja and meditation",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
  },
  {
    id: "7",
    name: "Designer Kurta",
    category: "Clothing",
    description: "Traditional designer kurta - price on request",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
  },
  {
    id: "8",
    name: "Lipstick Set",
    category: "Cosmetics",
    price: 299,
    description: "Set of 3 long-lasting lipsticks",
    image: "/placeholder.svg?height=200&width=200",
    inStock: true,
  },
]

const categories = ["All", "Pooja Items", "Sarees", "Clothing", "Cosmetics", "Kirana"]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const { addToCart } = useCart()
  const searchParams = useSearchParams()

  useEffect(() => {
    fetchProducts()
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [searchParams])

  useEffect(() => {
    filterProducts()
  }, [products, selectedCategory, searchTerm])

  // Replace the fetchProducts function with:
  const fetchProducts = async () => {
    try {
      if (!db) {
        console.warn("Firestore not available, using fallback data")
        setProducts(fallbackProducts)
        return
      }

      const productsRef = collection(db, "products")
      const querySnapshot = await getDocs(productsRef)

      const productsData: Product[] = []
      querySnapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() } as Product)
      })

      if (productsData.length === 0) {
        setProducts(fallbackProducts)
      } else {
        setProducts(productsData)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
      setProducts(fallbackProducts)
    } finally {
      setLoading(false)
    }
  }

  const filterProducts = () => {
    let filtered = products

    if (selectedCategory !== "All") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredProducts(filtered)
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Our Products</h1>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-4">
                  <div className="relative h-48 mb-4 bg-gray-100 rounded-lg overflow-hidden">
                    {product.image ? (
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <ShoppingCart className="w-12 h-12" />
                      </div>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-semibold">Out of Stock</span>
                      </div>
                    )}
                  </div>

                  <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2">{product.name}</h3>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <div>
                      {product.price ? (
                        <span className="text-lg font-bold text-orange-600">₹{product.price}</span>
                      ) : (
                        <span className="text-sm text-gray-500">Price on request</span>
                      )}
                    </div>

                    <Button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      size="sm"
                      className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No products found</p>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
