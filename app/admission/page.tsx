import Layout from '@/components/Layout'

export default function Admission() {
  const admissionProcess = [
    {
      step: 1,
      title: "Application Form",
      description: "Complete and submit the online application form with required documents"
    },
    {
      step: 2,
      title: "Entrance Test",
      description: "Attend the entrance examination based on grade level requirements"
    },
    {
      step: 3,
      title: "Interview",
      description: "Personal interview with student and parents/guardians"
    },
    {
      step: 4,
      title: "Admission Decision",
      description: "Receive admission decision and complete enrollment formalities"
    }
  ]

  const gradeRequirements = [
    {
      grade: "Primary (Grades 1-5)",
      age: "6-11 years",
      requirements: ["Birth Certificate", "Previous School Records", "Medical Certificate"],
      test: "Basic aptitude assessment"
    },
    {
      grade: "Middle School (Grades 6-8)", 
      age: "12-14 years",
      requirements: ["Academic Transcripts", "Transfer Certificate", "Character Certificate"],
      test: "Subject-based entrance test"
    },
    {
      grade: "High School (Grades 9-12)",
      age: "15-18 years", 
      requirements: ["Board Exam Results", "Migration Certificate", "Conduct Certificate"],
      test: "Comprehensive entrance examination"
    }
  ]

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="section-title">🤝 Admission</h1>
          
          <div className="max-w-6xl mx-auto">
            <div className="card mb-8">
              <h2 className="text-2xl font-semibold mb-4">Join Our School Community</h2>
              <p className="text-gray-700 leading-relaxed">
                We welcome students who are eager to learn and grow in a supportive academic environment. 
                Our admission process is designed to identify students who will thrive in our diverse and 
                challenging educational program.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-6">Admission Process</h3>
                <div className="space-y-4">
                  {admissionProcess.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{step.title}</h4>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="text-xl font-semibold mb-4">Important Dates</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Application Opens</span>
                    <span className="text-primary-600">December 1, 2024</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Application Deadline</span>
                    <span className="text-primary-600">March 31, 2025</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Entrance Test</span>
                    <span className="text-primary-600">April 15, 2025</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Results Announcement</span>
                    <span className="text-primary-600">May 1, 2025</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Session Begins</span>
                    <span className="text-primary-600">June 15, 2025</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Grade-wise Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {gradeRequirements.map((grade, index) => (
                  <div key={index} className="card">
                    <h4 className="text-lg font-semibold mb-2">{grade.grade}</h4>
                    <p className="text-primary-600 mb-3">Age: {grade.age}</p>
                    <div className="mb-4">
                      <h5 className="font-semibold mb-2">Required Documents:</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {grade.requirements.map((req, idx) => (
                          <li key={idx}>• {req}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-2">Assessment:</h5>
                      <p className="text-sm text-gray-600">{grade.test}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card mt-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Ready to Apply?</h3>
              <p className="text-gray-700 mb-6">
                Start your journey with us by submitting your application today.
              </p>
              <div className="space-x-4">
                <button className="btn-primary">Apply Now</button>
                <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
