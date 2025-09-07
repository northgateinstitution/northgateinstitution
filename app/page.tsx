"use client"
import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, Users, Trophy, Calendar, ArrowRight, X, Bell, Award, GraduationCap, Phone, UserCheck, Eye, TargetIcon } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

// Types
type Notice = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  file_name?: string;
  file_url?: string;
  file_type?: string;
};

// HomeNoticesQuizSection Component
const HomeNoticesQuizSection = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedNotices, setExpandedNotices] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);

        const response = await fetch('/api/notices?limit=3&offset=0', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store'
        });

        if (response.ok) {
          const data = await response.json();
          setNotices(Array.isArray(data) ? data : []);
        } else {
          setNotices([]);
        }
      } catch (error) {
        console.error('Error fetching notices:', error);
        setNotices([]);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedNotices);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedNotices(newExpanded);
  };

  const getFileIcon = (fileType?: string) => {
    if (!fileType) return '📎';

    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType === 'application/pdf') return '📄';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType === 'text/plain') return '📄';
    return '📎';
  };

  return (
    <div className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Latest Updates & Quick Quiz
          </h2>
          <p className="text-gray-600">
            Stay informed with important announcements and test your knowledge
          </p>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Left Side - Notices Box */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            {/* Notices Header */}
            <div className="bg-blue-700 p-4 flex items-center">
              <Bell className="text-white mr-2" size={20} />
              <h3 className="text-white font-semibold">Latest Notices</h3>
            </div>

            {/* Notices Content */}
            <div className="p-4">
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {notices.slice(0, 3).map((notice) => (
                    <article
                      key={notice.id}
                      className="bg-gray-50 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-800 text-sm line-clamp-1">
                          {notice.title}
                        </h4>
                        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {new Date(notice.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </div>

                      <div className="text-gray-600 text-sm mb-3">
                        {notice.content.length > 100 && !expandedNotices.has(notice.id) ? (
                          <>
                            <p className="whitespace-pre-wrap">
                              {notice.content.substring(0, 100)}...
                            </p>
                            <button
                              onClick={() => toggleExpand(notice.id)}
                              className="text-blue-600 hover:text-blue-800 text-xs mt-1"
                            >
                              Read More
                            </button>
                          </>
                        ) : (
                          <>
                            <p className="whitespace-pre-wrap">{notice.content}</p>
                            {notice.content.length > 100 && (
                              <button
                                onClick={() => toggleExpand(notice.id)}
                                className="text-blue-600 hover:text-blue-800 text-xs mt-1"
                              >
                                Show Less
                              </button>
                            )}
                          </>
                        )}
                      </div>

                      {/* File Attachment */}
                      {notice.file_name && notice.file_url && (
                        <div className="bg-blue-50 border border-blue-100 rounded p-2 mt-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="mr-2">{getFileIcon(notice.file_type)}</span>
                              <span className="text-xs text-blue-800">Attachment</span>
                            </div>
                            <button
                              onClick={() => window.open(notice.file_url, '_blank')}
                              className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                            >
                              View
                            </button>
                          </div>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              )}

              {/* View All Notices Button */}
              <div className="mt-6 text-center">
                <a
                  href="/notices"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  View All Notices
                  <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Quiz Section */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            {/* Quiz Header */}
            <div className="bg-purple-700 p-4 flex items-center">
              <Award className="text-white mr-2" size={20} />
              <h3 className="text-white font-semibold">Quick Quiz</h3>
            </div>

            {/* Quiz Content */}
            <div className="p-6 text-center">
              <div className="mb-6">
                <Award size={48} className="text-purple-600 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  Ready for a Challenge?
                </h4>
                <p className="text-gray-600">
                  Test your knowledge with our interactive quizzes and improve your skills
                </p>
              </div>

              {/* Quiz Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded p-3 border border-blue-100">
                  <div className="font-bold text-blue-600">Unlimited</div>
                  <div className="text-xs text-gray-600">Questions</div>
                </div>
                <div className="bg-purple-50 rounded p-3 border border-purple-100">
                  <div className="font-bold text-purple-600">No limit</div>
                  <div className="text-xs text-gray-600">Categories</div>
                </div>
                <div className="bg-green-50 rounded p-3 border border-green-100">
                  <div className="font-bold text-green-600">Open</div>
                  <div className="text-xs text-gray-600">For Everyone</div>
                </div>
              </div>

              {/* Quiz Start Button */}
              <a
                href="/student/solve"
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/student/solve";
                }}
              >
                Start Quiz Now
                <ArrowRight size={16} className="ml-1" />
              </a>

              {/* Additional Info */}
              <div className="mt-4 text-sm text-gray-500">
                <p>Instant results • Various categories • Track your progress</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  useEffect(() => {
    // Always show the popup when the home page loads
    setShowWelcomePopup(true);
  }, []);

  const handleClosePopup = () => {
    setShowWelcomePopup(false);
  };

  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      title: "Quality Education",
      description: "Comprehensive curriculum designed to foster academic excellence.",
      color: "blue"
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Expert Faculty",
      description: "Dedicated teachers committed to nurturing each student's potential.",
      color: "purple"
    },
    {
      icon: <Trophy className="w-8 h-8 text-amber-600" />,
      title: "Outstanding Results",
      description: "Consistent track record of academic achievements.",
      color: "amber"
    },
    {
      icon: <Calendar className="w-8 h-8 text-green-600" />,
      title: "Rich Activities",
      description: "Diverse extracurricular programs for holistic development.",
      color: "green"
    }
  ];

  // Carousel images
  const carouselImages = [
    {
      src: "/1.jpg",
      alt: "Students in classroom"
    },
    {
      src: "/2.jpg",
      alt: "Graduation ceremony"
    },
    {
      src: "/3.jpg",
      alt: "Students in science lab"
    },
    {
      src: "/4.jpg",
      alt: "Students in library"
    },
    {
      src: "/test.jpg",
      alt: "Sports and activities"
    },
    {
      src: "/6.jpg",
      alt: "Campus view"
    }
  ];

  // Academics programs
  const academicPrograms = [
    {
      title: "Class XI & XII Science",
      description: "Physics, Chemistry, Mathematics, Biology",
      icon: "🔬"
    },
    {
      title: "Class XI & XII Arts",
      description: "Humanities, Social Sciences, Languages",
      icon: "📚"
    },
    {
      title: "NEET Coaching",
      description: "Comprehensive preparation for medical entrance",
      icon: "⚕️"
    },
    {
      title: "IIT-JEE Coaching",
      description: "Focused training for engineering entrance",
      icon: "⚙️"
    },
    {
      title: "Test Series",
      description: "Regular assessments and mock tests",
      icon: "📝"
    },
    {
      title: "Doubt Classes",
      description: "Personalized attention for difficult concepts",
      icon: "❓"
    }
  ];

  return (
    <Layout>
      {/* Welcome Popup - Fixed to always show 500x500 until closed */}
      {showWelcomePopup && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-[500px] h-[500px] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-blue-700 p-5 text-white text-center relative">
              <button
                onClick={handleClosePopup}
                className="absolute top-4 right-4 text-white hover:text-gray-200"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold">Welcome to Northgate Institution</h2>
              <p className="text-blue-100 mt-1">Your journey begins here</p>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <GraduationCap size={40} className="text-blue-600" />
                </div>
                <p className="text-gray-700 mb-6">
                  Step into a world of knowledge, innovation, and endless opportunities at Northgate Institution.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <BookOpen size={20} className="text-blue-600 mr-3" />
                  <span className="text-gray-700">Interactive Learning</span>
                </div>
                <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                  <Trophy size={20} className="text-purple-600 mr-3" />
                  <span className="text-gray-700">Track Your Progress</span>
                </div>
                <div className="flex items-center p-3 bg-amber-50 rounded-lg">
                  <Award size={20} className="text-amber-600 mr-3" />
                  <span className="text-gray-700">Test Your Knowledge</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/student/solve"
                  className="bg-blue-600 text-white py-3 px-4 rounded-lg text-center font-medium hover:bg-blue-700 transition-colors"
                >
                  Start Quiz
                </Link>
                <button
                  onClick={handleClosePopup}
                  className="border border-gray-300 text-gray-700 py-3 px-4 rounded-lg text-center font-medium hover:bg-gray-50 transition-colors"
                >
                  Explore Campus
                </button>
              </div>
              <p className="text-center text-sm text-gray-500 mt-3">
                You can always access quizzes later from your dashboard.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Normal Image Carousel with Border */}
      <section className="relative h-[70vh] overflow-hidden bg-gray-100 mx-4 mt-4 rounded-xl border-4 border-blue-200 shadow-lg">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          speed={1000}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: '.custom-pagination',
          }}
          loop={true}
          className="h-full w-full"
        >
          {carouselImages.map((image, index) => (
            <SwiperSlide key={index} className="relative">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination */}
        <div className="custom-pagination absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10"></div>

        {/* Overlay Text */}
        <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Northgate Institution</h1>
            <p className="text-xl md:text-2xl mb-8">Excellence in Education Since 2005</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/admissions"
                className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Apply Now
              </Link>
              <Link
                href="/courses"
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Explore Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-lg shadow-sm">
              <GraduationCap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Academic Programs</h3>
              <p className="text-gray-600">Classes XI & XII, NEET, IIT-JEE coaching</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg shadow-sm">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Faculty</h3>
              <p className="text-gray-600">Experienced and dedicated teachers</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg shadow-sm">
              <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Excellent Results</h3>
              <p className="text-gray-600">Proven track record of success</p>
            </div>
          </div>
        </div>
      </section>

      {/* Notices & Quiz Section */}
      <HomeNoticesQuizSection />
      {/* About Section with Mission & Vision on Right Side */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              About Northgate Institution
            </h2>
            <p className="text-gray-600">
              Learn more about our history, mission, and achievements
            </p>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Side - About Content */}
            <div className="space-y-6">
              {/* About Us Card */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <div className="bg-blue-700 p-4 flex items-center">
                  <BookOpen className="text-white mr-2" size={20} />
                  <h3 className="text-white font-semibold">About Us</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">
                    Northgate Institution is a premier educational center dedicated to guiding students
                    towards a brighter future. We offer Class XI & XII (Science and Arts) education along
                    with specialized coaching for NEET and IIT-JEE.
                  </p>
                  <p className="text-gray-700 mb-6">
                    With experienced teachers, modern facilities, safe residential care, and a supportive
                    learning environment, we ensure that every student gets the right guidance, discipline,
                    and motivation to achieve success.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/about/introduction" className="inline-flex items-center bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Learn More
                      <ArrowRight size={18} className="ml-2" />
                    </Link>
                    <Link href="/contact" className="inline-flex items-center border border-blue-600 text-blue-600 px-5 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                      <Phone size={18} className="mr-2" />
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>

              {/* Mission Card */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <div className="bg-green-700 p-4 flex items-center">
                  <TargetIcon className="text-white mr-2" size={20} />
                  <h3 className="text-white font-semibold">Our Mission</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">
                    At Northgate Institution, we don&apos;t just teach—we inspire. Our mission is simple: to guide
                    students with the right knowledge, care, and confidence so they can dream bigger and achieve higher.
                  </p>
                  <p className="text-gray-700 mb-6">
                    With expert teachers, modern facilities, and a safe environment, we prepare every student
                    for success in XI, XII, NEET, and IIT-JEE. Your child&apos;s future is our responsibility—and
                    their success, our pride.
                  </p>
                  <Link href="/about/vision" className="inline-flex items-center text-green-700 font-semibold hover:text-green-800">
                    Learn More About Our Mission
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Side - Vision and Director's Message */}
            <div className="space-y-6">
              {/* Director's Message Card */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <div className="bg-amber-700 p-4 flex items-center">
                  <UserCheck className="text-white mr-2" size={20} />
                  <h3 className="text-white font-semibold">Director&apos;s Message</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4 italic">
                    &quot;Welcome to NORTHGATE INSTITUTION. Our institution is to nurture young minds with a blend
                    of modern education, moral values, and creativity, helping them build a bright and purposeful future.&quot;
                  </p>
                  <p className="text-gray-700 mb-6">
                    <span className="font-semibold">Md Rahamat Alam</span>
                    <br />
                    <span className="text-sm text-gray-600">Director, Northgate Institution</span>
                  </p>
                  <Link href="/about/directorMsg" className="inline-flex items-center text-amber-700 font-semibold hover:text-amber-800">
                    Read Full Message
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>

              {/* Vision Card */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <div className="bg-purple-700 p-4 flex items-center">
                  <Eye className="text-white mr-2" size={20} />
                  <h3 className="text-white font-semibold">Our Vision</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">
                    We dream of raising young people who are not only knowledgeable but also honest, kind,
                    and responsible. Our vision is to see our students grow into trusted professionals in
                    respected fields, carrying with them a deep sense of care for others.
                  </p>
                  <p className="text-gray-700 mb-6">
                    More than success alone, we want them to value integrity, compassion, and service to society.
                    By nurturing both heart and mind, our school seeks to prepare future leaders who will use
                    their talents to make the world more fair, caring, and hopeful for everyone.
                  </p>
                  <Link href="/about/vision" className="inline-flex items-center text-purple-700 font-semibold hover:text-purple-800">
                    Learn More About Our Vision
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Academic Programs</h2>
            <p className="text-gray-600">Comprehensive education for all levels</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {academicPrograms.map((program) => (
              <div key={program.title} className="bg-white rounded-lg p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow text-center">
                <div className="text-4xl mb-4">{program.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{program.title}</h3>
                <p className="text-gray-600 text-sm">{program.description}</p>
                <Link
                  href="/academics"
                  className="inline-block mt-4 text-blue-600 text-sm font-semibold hover:text-blue-800"
                >
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
            <p className="text-gray-600">Discover what makes our institution the perfect choice</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-lg p-6 text-center border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join Northgate Institution and take the first step towards a successful future
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admission" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Admission Information
            </Link>
            <Link href="/contact" className="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Contact Us
            </Link>
            <Link href="/visit" className="bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors">
              Schedule a Visit
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}