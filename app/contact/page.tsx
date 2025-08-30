"use client"
import Layout from '@/components/Layout'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import Image from 'next/image'

export default function Contact() {
  return (
    <Layout>
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-14">
            Contact Us
          </h1>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            
            {/* Left - Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Image src="/logo.png" alt="Logo" width={60} height={60} className="rounded-xl" />
                <h2 className="text-2xl font-semibold text-gray-800">Northgate Institution</h2>
              </div>

              <p className="text-gray-600 text-lg">
                Reach out to us for any queries or support. We’re always here to guide you towards a brighter future.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-6 h-6 text-blue-600" />
                  <span className="text-gray-700 text-lg">+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-purple-600" />
                  <span className="text-gray-700 text-lg">info@northgate.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700 text-lg">123 Northgate Road, Kolkata, India</span>
                </div>
              </div>

              {/* Buttons for Map & WhatsApp */}
              <div className="flex gap-4 pt-4">
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=Northgate+Institution" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl shadow-md font-medium flex items-center gap-2"
                >
                  <MapPin className="w-5 h-5" /> Google Map
                </a>
                <a 
                  href="https://wa.me/+919593903422" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl shadow-md font-medium flex items-center gap-2"
                >
                  <Image src="/whatsapp-svgrepo-com.svg" alt="WhatsApp" width={22} height={22} /> WhatsApp
                </a>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h3>
              <form className="space-y-5">
                <input type="text" placeholder="Your Name" className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-400" />
                <input type="email" placeholder="Your Email" className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-400" />
                <textarea placeholder="Your Message" rows={4} className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-400"></textarea>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" /> Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Google Map */}
          <div className="mt-16">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.519581076809!2d88.01460407538471!3d25.286741677653414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fac34ce213a2fb%3A0x7958f34606e1d7ca!2sNORTHGATE%20INSTITUTION%20(XI%2CXII%2CNEET%2CJEE)!5e0!3m2!1sen!2sin!4v1756316451362!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-2xl shadow-lg"
            ></iframe>
          </div>
        </div>
      </section>
    </Layout>
  )
}
