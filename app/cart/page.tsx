"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { Trash2, Plus, Minus, Download, MessageCircle, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import jsPDF from "jspdf"
import Papa from "papaparse"

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart()
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")

  const downloadPDF = () => {
    const doc = new jsPDF()

    // Header
    doc.setFontSize(20)
    doc.text("Harshita General & Kirana Store", 20, 20)
    doc.setFontSize(16)
    doc.text("Cart Summary", 20, 35)

    // Customer details
    if (customerName || customerPhone) {
      doc.setFontSize(12)
      doc.text(`Customer: ${customerName}`, 20, 50)
      doc.text(`Phone: ${customerPhone}`, 20, 60)
    }

    // Items
    let yPosition = customerName || customerPhone ? 80 : 60
    doc.setFontSize(12)
    doc.text("Items:", 20, yPosition)

    cartItems.forEach((item, index) => {
      yPosition += 15
      const itemText = `${item.name} x ${item.quantity}`
      const priceText = item.price ? `₹${(item.price * item.quantity).toFixed(2)}` : "Price on request"
      doc.text(itemText, 20, yPosition)
      doc.text(priceText, 150, yPosition)
    })

    // Total
    yPosition += 20
    doc.setFontSize(14)
    const total = getCartTotal()
    if (total > 0) {
      doc.text(`Total: ₹${total.toFixed(2)}`, 20, yPosition)
    }

    doc.save("cart-summary.pdf")
  }

  const downloadCSV = () => {
    const csvData = cartItems.map((item) => ({
      "Product Name": item.name,
      Quantity: item.quantity,
      "Unit Price": item.price ? `₹${item.price}` : "Price on request",
      Total: item.price ? `₹${(item.price * item.quantity).toFixed(2)}` : "Price on request",
    }))

    // Add total row
    const total = getCartTotal()
    if (total > 0) {
      csvData.push({
        "Product Name": "TOTAL",
        Quantity: "",
        "Unit Price": "",
        Total: `₹${total.toFixed(2)}`,
      })
    }

    const csv = Papa.unparse(csvData)
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "cart-summary.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const placeOrderViaWhatsApp = () => {
    let message = `Hello! I would like to place an order from Harshita General & Kirana Store:\n\n`

    if (customerName) message += `Customer Name: ${customerName}\n`
    if (customerPhone) message += `Phone: ${customerPhone}\n\n`

    message += `Order Details:\n`
    cartItems.forEach((item) => {
      message += `• ${item.name} x ${item.quantity}`
      if (item.price) {
        message += ` - ₹${(item.price * item.quantity).toFixed(2)}`
      }
      message += `\n`
    })

    const total = getCartTotal()
    if (total > 0) {
      message += `\nTotal Amount: ₹${total.toFixed(2)}`
    }

    message += `\n\nPlease confirm the order and let me know the pickup/delivery details.`

    const whatsappUrl = `https://wa.me/918058124167?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Add some products to get started!</p>
              <Button className="bg-orange-600 hover:bg-orange-700">Continue Shopping</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cart Items ({cartItems.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          <ShoppingCart className="w-6 h-6" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      {item.price ? (
                        <p className="text-orange-600 font-semibold">₹{item.price}</p>
                      ) : (
                        <p className="text-gray-500 text-sm">Price on request</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      {item.price ? (
                        <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                      ) : (
                        <p className="text-sm text-gray-500">Price on request</p>
                      )}
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Your Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                  <Input
                    placeholder="Phone Number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span>Items:</span>
                    <span>{cartItems.length}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Quantity:</span>
                    <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                  </div>
                  {getCartTotal() > 0 && (
                    <div className="flex justify-between items-center text-lg font-semibold border-t pt-2">
                      <span>Total:</span>
                      <span className="text-orange-600">₹{getCartTotal().toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Button onClick={placeOrderViaWhatsApp} className="w-full bg-green-600 hover:bg-green-700">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Order via WhatsApp
                  </Button>

                  <div className="flex gap-2">
                    <Button onClick={downloadPDF} variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      PDF
                    </Button>
                    <Button onClick={downloadCSV} variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      CSV
                    </Button>
                  </div>

                  <Button
                    onClick={clearCart}
                    variant="outline"
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Clear Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
