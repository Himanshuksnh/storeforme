"use client"

import { Phone, MessageCircle, MapPin, Clock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPage() {
  const handleWhatsAppClick = () => {
    const message = "Hello! I would like to know more about your products and services."
    const whatsappUrl = `https://wa.me/918058124167?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleCallClick = () => {
    window.location.href = "tel:+918058124167"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">Get in touch with Harshita General & Kirana Store</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="w-6 h-6 text-orange-600 mr-3" />
                  Call Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Have questions? Give us a call during business hours.</p>
                <div className="space-y-2">
                  <p className="font-semibold text-lg">+91 80581 24167</p>
                  <Button onClick={handleCallClick} className="bg-orange-600 hover:bg-orange-700">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-6 h-6 text-green-600 mr-3" />
                  WhatsApp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Chat with us on WhatsApp for quick responses and easy ordering.</p>
                <div className="space-y-2">
                  <p className="font-semibold text-lg">+91 80581 24167</p>
                  <Button onClick={handleWhatsAppClick} className="bg-green-600 hover:bg-green-700">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat on WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-6 h-6 text-blue-600 mr-3" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Saturday:</span>
                    <span className="font-semibold">8:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-semibold">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-800">
                      <strong>Note:</strong> We're always available on WhatsApp for urgent queries!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="w-6 h-6 text-purple-600 mr-3" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Send us an email for detailed inquiries or feedback.</p>
                <p className="font-semibold text-lg">harshita.store@gmail.com</p>
              </CardContent>
            </Card>
          </div>

          {/* Map and Address */}
          <div className="space-y-6">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-6 h-6 text-red-600 mr-3" />
                  Visit Our Store
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Address:</h3>
                    <p className="text-gray-600">
                      123 Main Market Street,
                      <br />
                      Near City Hospital,
                      <br />
                      Sector 15, New Delhi - 110001
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Landmarks:</h3>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Opposite State Bank of India</li>
                      <li>• Next to Sharma Medical Store</li>
                      <li>• 2 minutes walk from Metro Station</li>
                    </ul>
                  </div>

                  <Button
                    onClick={() => window.open("https://maps.google.com/?q=28.6139,77.2090", "_blank")}
                    variant="outline"
                    className="w-full border-red-600 text-red-600 hover:bg-red-50"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Google Maps Embed */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-80">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.674665!2d77.2090!3d28.6139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzUwLjAiTiA3N8KwMTInMzIuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Harshita General & Kirana Store Location"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <Card className="bg-gradient-to-r from-orange-100 to-pink-100">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl mb-2">🛍️</div>
                <h3 className="font-semibold mb-2">Wide Range</h3>
                <p className="text-gray-600 text-sm">From daily essentials to special occasion items</p>
              </div>
              <div>
                <div className="text-3xl mb-2">💰</div>
                <h3 className="font-semibold mb-2">Best Prices</h3>
                <p className="text-gray-600 text-sm">Competitive prices with regular offers</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🤝</div>
                <h3 className="font-semibold mb-2">Personal Service</h3>
                <p className="text-gray-600 text-sm">Friendly staff and personalized attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
