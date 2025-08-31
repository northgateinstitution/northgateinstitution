"use client"
import Layout from '@/components/Layout'
import { Lightbulb, Target, Star, Shield, Rocket } from 'lucide-react'
import { motion } from 'framer-motion'

export default function VisionMission() {
    return (
        <Layout>
            <section className="relative py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 w-full">
                <div className="w-full px-8">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-6xl font-extrabold text-center text-gray-800 mb-20"
                    >
                        Vision & Mission
                    </motion.h1>

                    <div className="w-full space-y-16">

                        {/* Vision */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="p-12 bg-white shadow-lg rounded-3xl border border-gray-100 hover:shadow-2xl transition"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <Lightbulb className="w-10 h-10 text-yellow-500" />
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Vision</h2>
                            </div>
                            
                            <div className="mb-8">
                                

                                <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden">
                                    <div className="absolute right-0 top-0 text-gray-100 text-8xl mr-4 mt-2 opacity-20">
                                        ❝
                                    </div>
                                    <p className="text-gray-700 text-xl leading-relaxed mb-6">
                                        We dream of raising young people who are not only knowledgeable but also honest, kind, and responsible.
                                        Our vision is to see our students grow into trusted professionals in respected fields, carrying with them
                                        a deep sense of care for others. More than success alone, we want them to value integrity, compassion,
                                        and service to society.
                                    </p>
                                    <p className="text-gray-700 text-xl leading-relaxed">
                                        By nurturing both heart and mind, our school seeks to prepare future leaders who
                                        will use their talents to make the world more fair, caring, and hopeful for everyone.
                                    </p>
                                </div>
                            </div>
                            
                            {/* Bengali Vision */}
                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <div className="flex items-center mb-6">
                                    <div className="bg-gradient-to-b from-yellow-400 to-yellow-600 h-10 w-1 rounded-full mr-4"></div>
                                    <h2 className="text-3xl font-bold text-gray-800">আমাদের ভিশন</h2>
                                </div>

                                <div className="bg-blue-50 rounded-xl shadow-lg p-8 relative overflow-hidden">
                                    <div className="absolute right-0 top-0 text-blue-100 text-8xl mr-4 mt-2 opacity-20">
                                        ❝
                                    </div>
                                    <p className="text-gray-700 text-xl leading-relaxed mb-6">
                                        আমাদের স্বপ্ন হলো এমন মানুষ তৈরি করা, যারা জ্ঞানী হওয়ার পাশাপাশি সৎ, দায়িত্বশীল ও সহমর্মী হবে।
                                        আমরা চাই আমাদের শিক্ষার্থীরা জীবনের প্রতিটি ক্ষেত্রে সম্মানের সঙ্গে প্রতিষ্ঠিত হোক এবং সমাজের কল্যাণে এগিয়ে আসুক।
                                    </p>
                                    <p className="text-gray-700 text-xl leading-relaxed">
                                        শুধু ব্যক্তিগত সাফল্য নয়, তারা যেন সততা, মানবিকতা ও ভালোবাসা দিয়ে সমাজকে আরও সুন্দর ও আলোকিত করে তোলে।
                                        আমাদের বিদ্যালয় বিশ্বাস করে—শিক্ষাই পারে আগামী দিনের নাগরিকদের স্বপ্ন গড়তে, যারা দেশ ও বিশ্বকে করবে আরও আশা জাগানিয়া।
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Mission */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="p-12 bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl rounded-3xl text-white hover:shadow-2xl transition"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <Target className="w-10 h-10 text-white" />
                                <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
                            </div>
                            
                            <div className="mb-8">
                                

                                <div className="rounded-xl p-8 relative overflow-hidden">
                                    <div className="absolute right-0 top-0 text-white text-8xl mr-4 mt-2 opacity-20">
                                        ❝
                                    </div>
                                    <p className="text-white text-xl leading-relaxed mb-6">
                                        At Northgate Institution, we don&apos;t just teach—we inspire.
                                        Our mission is simple: to guide students with the right knowledge, care, and confidence so they can dream bigger and achieve higher.
                                         With expert teachers, modern facilities, and a safe environment, we prepare every student for success in XI, XII, NEET, and IIT-JEE.
                                    
                                    </p>
                                   

                                    <div className="border-l-4 border-blue-300 pl-4 italic text-white text-xl">
                                        Your child&apos;s future is our responsibility—and their success, our pride.
                                    </div>

                                    <div className="mt-12 text-right">
                                        <p className="text-white font-semibold">Best Regards,</p>
                                        <p className="text-3xl text-blue-200 font-bold">Nawaj Sarif</p>
                                        <p className="text-gray-200">Director, Northgate Institution</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Bengali Mission */}
                            <div className="mt-12 pt-8 border-t border-blue-400 border-opacity-30">
                                <div className="flex items-center mb-6">
                                    <div className="bg-white h-10 w-1 rounded-full mr-4 opacity-50"></div>
                                    <h2 className="text-3xl font-bold text-white">আমাদের মিশন</h2>
                                </div>

                                <div className="rounded-xl p-8 relative overflow-hidden bg-blue-700 bg-opacity-20">
                                    <div className="absolute right-0 top-0 text-white text-8xl mr-4 mt-2 opacity-20">
                                        ❝
                                    </div>
                                    <p className="text-white text-xl leading-relaxed mb-6">
                                        নর্থগেট ইনস্টিটিউশনে, আমরা কেবল পড়াই না - আমরা অনুপ্রেরণা জাগাই।
                                        আমাদের মিশনটি সহজ: শিক্ষার্থীদের সঠিক জ্ঞান, যত্ন এবং আত্মবিশ্বাসের সাথে গাইড করা যাতে তারা আরও বড় স্বপ্ন দেখতে এবং আরও উচ্চতায় পৌঁছাতে পারে।
                                        
                                        বিশেষজ্ঞ শিক্ষক, আধুনিক সুবিধা এবং একটি নিরাপদ পরিবেশের সাথে, আমরা XI, XII, NEET এবং IIT-JEE-তে সাফল্যের জন্য প্রতিটি শিক্ষার্থীকে প্রস্তুত করি।
                                
                                    </p>
                                    

                                    <div className="border-l-4 border-blue-300 pl-4 italic text-white text-xl">
                                        আপনার সন্তানের ভবিষ্যৎ দায়িত্ব—এবং তাদের সাফল্য, আমাদের গর্ব।
                                    </div>

                                    <div className="mt-12 text-right">
                                        <p className="text-white font-semibold">শুভেচ্ছান্তে,</p>
                                        <p className="text-3xl text-blue-200 font-bold">নওয়াজ শরীফ</p>
                                        <p className="text-gray-200">পরিচালক, নর্থগেট ইনস্টিটিউশন</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Core Values */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="p-12 bg-white shadow-lg rounded-3xl border border-gray-100"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">Our Core Values</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                <div className="text-center p-8 rounded-xl hover:bg-blue-50 transition">
                                    <Star className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
                                    <h3 className="font-semibold text-2xl mb-3">Excellence</h3>
                                    <p className="text-gray-600 text-lg">Striving for the highest standards in all endeavors</p>
                                </div>
                                <div className="text-center p-8 rounded-xl hover:bg-purple-50 transition">
                                    <Shield className="w-12 h-12 mx-auto text-purple-600 mb-4" />
                                    <h3 className="font-semibold text-2xl mb-3">Integrity</h3>
                                    <p className="text-gray-600 text-lg">Upholding honesty and moral principles</p>
                                </div>
                                <div className="text-center p-8 rounded-xl hover:bg-green-50 transition">
                                    <Rocket className="w-12 h-12 mx-auto text-green-600 mb-4" />
                                    <h3 className="font-semibold text-2xl mb-3">Innovation</h3>
                                    <p className="text-gray-600 text-lg">Embracing new ideas and creative solutions</p>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>
        </Layout>
    )
}