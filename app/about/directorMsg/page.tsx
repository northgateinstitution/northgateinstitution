"use client"
import Layout from '@/components/Layout'
import { Quote, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function DirectorsMessage() {
  return (
    <Layout>
      <section className="relative py-28 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">

          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: -30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-7xl font-extrabold text-center text-gray-900 mb-24 tracking-tight"
          >
            Director’s Message <span className="block text-3xl md:text-4xl text-indigo-600 mt-2">পরিচালকের বাণী</span>
          </motion.h1>

          <div className="space-y-20">

            {/* Message 1 - English */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-14 bg-white shadow-2xl rounded-3xl border border-gray-200 hover:shadow-3xl transition-transform transform hover:-translate-y-2"
            >
              <div className="flex items-center gap-4 mb-10">
                <Quote className="w-12 h-12 text-indigo-600" />
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800">Message from the Director</h2>
              </div>
              <p className="text-gray-700 text-2xl leading-relaxed mb-12">
                Dear Students and Parents, <br /><br />
                At our school, we believe every child has the power to dream big, rise high, 
                and live with courage and self-respect. Education for us is more than lessons 
                in books; it is about building confidence, honesty, and creativity. We want 
                our students to think freely, express themselves, and face challenges with 
                strength. With the right values and guidance, they will not only achieve 
                success but also bring positive change to society. Together, let us help 
                our children spread their wings and shine brightly in the world.
              </p>
              <div className="mt-10 text-right">
                <p className="text-3xl font-semibold text-gray-900">Masidur Rahman</p>
                <p className="text-xl text-gray-600">Director</p>
              </div>
            </motion.div>

            {/* Message 2 - Another Director */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-14 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 shadow-2xl rounded-3xl text-white hover:shadow-3xl transition-transform transform hover:-translate-y-2"
            >
              <div className="flex items-center gap-4 mb-10">
                <Sparkles className="w-12 h-12 text-yellow-300" />
                <h2 className="text-4xl md:text-5xl font-bold">Director’s Message</h2>
              </div>
              <p className="text-2xl leading-relaxed mb-12">
                Welcome to <span className="font-semibold">NORTHGATE INSTITUTION</span>. 
                Our institution nurtures young minds with a blend of modern education, 
                moral values, and creativity, helping them build a bright and purposeful future. 
                We believe every child is gifted with unique potential, and with proper 
                guidance, they will grow into confident, responsible, and proud citizens of tomorrow. <br /><br />
                Your trust and support are our greatest strength.
              </p>
              <div className="mt-10 text-right">
                <p className="text-3xl font-semibold">Md Rahamat Alam</p>
                <p className="text-xl opacity-90">Director</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </Layout>
  )
}
