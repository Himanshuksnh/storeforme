import { Phone, MessageCircle, MapPin, Mail, Heart } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Store Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Harshita General & Kirana Store</h3>
            <p className="text-gray-300 mb-4">
              Your trusted neighborhood store for all daily essentials, pooja items, sarees, clothing, cosmetics, and
              kirana items. Serving the community with quality products and friendly service.
            </p>
            <div className="flex space-x-4">
              <a
                href="tel:+918058124167"
                className="bg-orange-600 hover:bg-orange-700 p-2 rounded-full transition-colors duration-200"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/918058124167"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 p-2 rounded-full transition-colors duration-200"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="mailto:harshita.store@gmail.com"
                className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-colors duration-200"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/offers" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Current Offers
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    123 Main Market Street,
                    <br />
                    Near City Hospital,
                    <br />
                    Sector 15, New Delhi - 110001
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-orange-400" />
                <p className="text-gray-300 text-sm">+91 80581 24167</p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-orange-400" />
                <p className="text-gray-300 text-sm">harshita.store@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Business Hours</h4>
              <div className="space-y-2 text-gray-300 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Saturday:</span>
                  <span>8:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>9:00 AM - 8:00 PM</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Categories</h4>
              <div className="grid grid-cols-2 gap-2 text-gray-300 text-sm">
                <Link href="/products?category=Pooja Items" className="hover:text-white transition-colors duration-200">
                  Pooja Items
                </Link>
                <Link href="/products?category=Sarees" className="hover:text-white transition-colors duration-200">
                  Sarees
                </Link>
                <Link href="/products?category=Clothing" className="hover:text-white transition-colors duration-200">
                  Clothing
                </Link>
                <Link href="/products?category=Cosmetics" className="hover:text-white transition-colors duration-200">
                  Cosmetics
                </Link>
                <Link href="/products?category=Kirana" className="hover:text-white transition-colors duration-200">
                  Kirana
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm flex items-center justify-center">
            © {currentYear} Harshita General & Kirana Store. Made with <Heart className="w-4 h-4 text-red-500 mx-1" />{" "}
            love for our community.
          </p>
        </div>
      </div>
    </footer>
  )
}
