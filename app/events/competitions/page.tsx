import Layout from '@/components/Layout'

export default function Competitions() {
  const competitions = [
    {
      category: "Academic Competitions",
      events: [
        { name: "Math Olympiad", level: "Inter-School", month: "October" },
        { name: "Science Quiz", level: "Regional", month: "November" },
        { name: "Debate Championship", level: "State", month: "December" },
        { name: "Essay Writing Contest", level: "National", month: "January" }
      ]
    },
    {
      category: "Sports Competitions", 
      events: [
        { name: "Basketball Tournament", level: "Inter-School", month: "September" },
        { name: "Swimming Championship", level: "District", month: "October" },
        { name: "Athletics Meet", level: "Regional", month: "November" },
        { name: "Football League", level: "State", month: "February" }
      ]
    },
    {
      category: "Cultural Competitions",
      events: [
        { name: "Dance Competition", level: "Inter-School", month: "December" },
        { name: "Music Festival", level: "Regional", month: "January" },
        { name: "Art Exhibition", level: "State", month: "February" },
        { name: "Drama Festival", level: "National", month: "March" }
      ]
    },
    {
      category: "Technology Competitions",
      events: [
        { name: "Coding Challenge", level: "Inter-School", month: "November" },
        { name: "Robotics Competition", level: "Regional", month: "December" },
        { name: "Web Design Contest", level: "State", month: "January" },
        { name: "Innovation Fair", level: "National", month: "March" }
      ]
    }
  ]

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="section-title">Competitions & Contests</h1>
          <div className="max-w-6xl mx-auto">
            <div className="card mb-8">
              <h2 className="text-2xl font-semibold mb-4">Compete and Excel</h2>
              <p className="text-gray-700 leading-relaxed">
                We encourage our students to participate in various competitions to challenge themselves, 
                showcase their talents, and gain recognition at different levels - from local to national competitions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {competitions.map((category, index) => (
                <div key={index} className="card">
                  <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
                  <div className="space-y-3">
                    {category.events.map((event, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{event.name}</h4>
                            <p className="text-sm text-gray-600">{event.level} Level</p>
                          </div>
                          <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                            {event.month}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="card mt-8">
              <h3 className="text-xl font-semibold mb-4">How to Participate</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary-600 font-bold text-xl">1</span>
                  </div>
                  <h4 className="font-semibold mb-2">Register</h4>
                  <p className="text-gray-600 text-sm">Sign up through your class teacher or the events coordinator</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-secondary-600 font-bold text-xl">2</span>
                  </div>
                  <h4 className="font-semibold mb-2">Prepare</h4>
                  <p className="text-gray-600 text-sm">Get coaching and practice sessions with our expert mentors</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary-600 font-bold text-xl">3</span>
                  </div>
                  <h4 className="font-semibold mb-2">Compete</h4>
                  <p className="text-gray-600 text-sm">Participate and showcase your talents at various levels</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
