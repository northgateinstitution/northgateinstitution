import Layout from '@/components/Layout'

export default function AnnualFunctions() {
  const annualEvents = [
    {
      name: "Annual Day Celebration",
      month: "December",
      description: "The grandest celebration of the year featuring cultural performances, awards ceremony, and recognition of achievements.",
      highlights: ["Student Performances", "Achievement Awards", "Cultural Programs", "Guest Speakers"],
      image: "annual-day-placeholder.jpg"
    },
    {
      name: "Graduation Ceremony",
      month: "April", 
      description: "Formal ceremony celebrating the completion of studies for our graduating students.",
      highlights: ["Diploma Presentation", "Valedictorian Speech", "Alumni Welcome", "Photo Sessions"],
      image: "graduation-placeholder.jpg"
    },
    {
      name: "Founder's Day",
      month: "September",
      description: "Commemorating the establishment of our school and honoring its founding principles.",
      highlights: ["Historical Presentation", "Traditional Ceremonies", "Community Service", "Time Capsule"],
      image: "founders-day-placeholder.jpg"
    },
    {
      name: "International Day",
      month: "March",
      description: "Celebrating cultural diversity and global awareness through various international themes.",
      highlights: ["Cultural Exhibits", "International Cuisine", "Flag Ceremony", "Unity Programs"],
      image: "international-day-placeholder.jpg"
    }
  ]

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="section-title">Annual Functions</h1>
          <div className="max-w-6xl mx-auto">
            <div className="card mb-8">
              <h2 className="text-2xl font-semibold mb-4">Celebrating Traditions</h2>
              <p className="text-gray-700 leading-relaxed">
                Our annual functions are cornerstone events that bring together the entire school community. 
                These celebrations honor our traditions, recognize achievements, and create lasting memories.
              </p>
            </div>

            <div className="space-y-8">
              {annualEvents.map((event, index) => (
                <div key={index} className="card">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-xl font-semibold">{event.name}</h3>
                        <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">
                          {event.month}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4">{event.description}</p>
                      <div>
                        <h4 className="font-semibold mb-2">Event Highlights:</h4>
                        <ul className="text-gray-600 space-y-1">
                          {event.highlights.map((highlight, idx) => (
                            <li key={idx}>• {highlight}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div>
                      <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">Event Photo</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

