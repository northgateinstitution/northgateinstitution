"use client"
import Layout from '@/components/Layout'
import { GraduationCap, BookOpen, Users, Home } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Introduction() {
  return (
    <Layout>
      <section className="relative py-24 bg-gradient-to-br from-indigo-50 via-white to-blue-50 w-full">
        <div className="w-full px-8">
          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-extrabold text-center text-gray-800 mb-20"
          >
            Introduction / পরিচিতি
          </motion.h1>

          <div className="w-full space-y-16">
            
            {/* English Intro */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-12 bg-white shadow-lg rounded-3xl border border-gray-100 hover:shadow-2xl transition"
            >
              <div className="flex items-center gap-4 mb-8">
                <GraduationCap className="w-10 h-10 text-indigo-600" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Introduction</h2>
              </div>
              <p className="text-gray-700 text-xl leading-relaxed">
                Northgate Institution is a center of academic excellence dedicated to guiding students towards a brighter future. 
                We offer <span className="font-semibold">Class XI & XII (Science and Arts)</span> education along with specialized 
                coaching for <span className="font-semibold">NEET and IIT-JEE</span>. With experienced teachers, modern facilities, 
                safe residential care, and a supportive learning environment, we ensure that every student gets the right guidance, 
                discipline, and motivation to achieve success.
              </p>
            </motion.div>

            {/* Bengali Intro */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-12 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-xl rounded-3xl text-white hover:shadow-2xl transition"
            >
              <div className="flex items-center gap-4 mb-8">
                <BookOpen className="w-10 h-10 text-white" />
                <h2 className="text-3xl md:text-4xl font-bold">পরিচিতি</h2>
              </div>
              <p className="text-xl leading-relaxed">
                নর্থগেট ইনস্টিটিউশন হলো একটি আধুনিক শিক্ষাকেন্দ্র যেখানে গড়ে ওঠে উজ্জ্বল ভবিষ্যৎ। 
                এখানে একাদশ ও দ্বাদশ (বিজ্ঞান ও কলা বিভাগ) এর পাশাপাশি <span className="font-semibold">NEET ও IIT-JEE</span>-এর 
                বিশেষ প্রশিক্ষণ দেওয়া হয়। অভিজ্ঞ শিক্ষক, আধুনিক পরিকাঠামো, নিরাপদ আবাসন ও সহায়ক শিক্ষার পরিবেশের মাধ্যমে 
                আমরা প্রতিটি শিক্ষার্থীকে সঠিক দিশা, শৃঙ্খলা ও প্রেরণা দিয়ে সাফল্যের পথে এগিয়ে নিয়ে যাই।
              </p>
            </motion.div>

            {/* Key Features */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-12 bg-white shadow-lg rounded-3xl border border-gray-100"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">Why Choose Northgate?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                
                <div className="text-center p-8 rounded-xl hover:bg-indigo-50 transition">
                  <Users className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
                  <h3 className="font-semibold text-2xl mb-3">Experienced Teachers</h3>
                  <p className="text-gray-600 text-lg">Dedicated faculty guiding students towards excellence</p>
                </div>

                <div className="text-center p-8 rounded-xl hover:bg-blue-50 transition">
                  <Home className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                  <h3 className="font-semibold text-2xl mb-3">Safe Residential Care</h3>
                  <p className="text-gray-600 text-lg">Secure and disciplined environment for better focus</p>
                </div>

                <div className="text-center p-8 rounded-xl hover:bg-green-50 transition">
                  <BookOpen className="w-12 h-12 mx-auto text-green-600 mb-4" />
                  <h3 className="font-semibold text-2xl mb-3">Special Coaching</h3>
                  <p className="text-gray-600 text-lg">Focused NEET & IIT-JEE preparation with personal guidance</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </Layout>
  )
}
