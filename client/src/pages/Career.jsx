import React, { useState } from 'react';
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaDollarSign, FaUsers, FaRocket, FaHeart, FaGraduationCap, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Career = () => {
  const [expandedJob, setExpandedJob] = useState(null);

  const jobListings = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      salary: "₹15-25 LPA",
      description: "We're looking for a passionate full-stack developer to join our growing team. You'll work on cutting-edge projects using modern technologies.",
      requirements: [
        "5+ years of experience in full-stack development",
        "Proficiency in React, Node.js, and databases",
        "Experience with cloud platforms (AWS/Azure)",
        "Strong problem-solving skills"
      ]
    },
    {
      id: 2,
      title: "UI/UX Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      salary: "₹8-15 LPA",
      description: "Create beautiful and intuitive user experiences for our digital products. Work closely with development teams to bring designs to life.",
      requirements: [
        "3+ years of UI/UX design experience",
        "Proficiency in Figma, Adobe Creative Suite",
        "Understanding of user-centered design principles",
        "Portfolio showcasing web and mobile designs"
      ]
    },
    {
      id: 3,
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Bangalore, India",
      type: "Full-time",
      salary: "₹12-20 LPA",
      description: "Build and maintain our cloud infrastructure. Implement CI/CD pipelines and ensure scalable, reliable systems.",
      requirements: [
        "4+ years of DevOps experience",
        "Experience with Docker, Kubernetes",
        "Knowledge of AWS/Azure services",
        "Scripting skills in Python/Bash"
      ]
    },
    {
      id: 4,
      title: "Product Manager",
      department: "Product",
      location: "Delhi, India",
      type: "Full-time",
      salary: "₹18-30 LPA",
      description: "Drive product strategy and roadmap. Work with cross-functional teams to deliver exceptional user experiences.",
      requirements: [
        "5+ years of product management experience",
        "Strong analytical and strategic thinking",
        "Experience with Agile methodologies",
        "Excellent communication skills"
      ]
    }
  ];

  const benefits = [
    {
      icon: <FaHeart className="text-2xl" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health support, and wellness programs"
    },
    {
      icon: <FaGraduationCap className="text-2xl" />,
      title: "Learning & Development",
      description: "Continuous learning opportunities, conference attendance, and skill development programs"
    },
    {
      icon: <FaUsers className="text-2xl" />,
      title: "Work-Life Balance",
      description: "Flexible working hours, remote work options, and generous paid time off"
    },
    {
      icon: <FaRocket className="text-2xl" />,
      title: "Career Growth",
      description: "Clear career progression paths, mentorship programs, and leadership opportunities"
    }
  ];

  const toggleJobExpansion = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Join Our Team
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Build the future of technology with us. We're looking for passionate individuals who want to make a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                View Open Positions
              </button>
              <button className="text-slate-200 hover:text-white border border-slate-600 hover:border-blue-500 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105">
                Learn About Our Culture
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Why Work With Us Section */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Why Mohora Technologies?
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            We believe in creating an environment where innovation thrives and people grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg border border-slate-700/50 rounded-xl p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
            >
              <div className="text-gradient-to-r from-blue-400 to-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                {benefit.title}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Job Listings Section */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Open Positions
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Find your next career opportunity and help us build amazing products.
          </p>
        </div>

        <div className="space-y-6">
          {jobListings.map((job) => (
            <div
              key={job.id}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg border border-slate-700/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-blue-500/50"
            >
              <div
                className="p-8 cursor-pointer"
                onClick={() => toggleJobExpansion(job.id)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-white hover:text-blue-300 transition-colors duration-300">
                        {job.title}
                      </h3>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 border border-blue-500/30">
                        {job.department}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-6 text-slate-300 mb-4">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-blue-400" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaClock className="text-emerald-400" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaDollarSign className="text-purple-400" />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                    
                    <p className="text-slate-300 leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                  
                  <div className="mt-6 lg:mt-0 lg:ml-8 flex items-center gap-4">
                    <button className="text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                      Apply Now
                    </button>
                    <div className="text-slate-400 hover:text-white transition-colors duration-300">
                      {expandedJob === job.id ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Expanded Job Details */}
              <div className={`overflow-hidden transition-all duration-500 ${expandedJob === job.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-8 pb-8 border-t border-slate-700/50">
                  <h4 className="text-lg font-bold text-white mb-4 mt-6">Requirements:</h4>
                  <ul className="space-y-2">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3 text-slate-300">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Process Section */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Our Hiring Process
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            We've designed a straightforward process to help you showcase your skills and learn about us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Apply Online",
              description: "Submit your application with your resume and cover letter. We review every application carefully."
            },
            {
              step: "02",
              title: "Technical Interview",
              description: "Showcase your technical skills and problem-solving abilities in a collaborative discussion."
            },
            {
              step: "03",
              title: "Cultural Fit",
              description: "Meet the team and learn about our culture while we get to know you better."
            }
          ].map((process, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl">
                  <span className="text-2xl font-bold text-white">{process.step}</span>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-600/30 to-purple-600/30 transform translate-x-10"></div>
                )}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
                {process.title}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {process.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Ready to Join Us?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Take the next step in your career journey. We can't wait to meet you and see what amazing things we can build together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              Browse All Jobs
            </button>
            <button className="text-slate-200 hover:text-white border border-slate-600 hover:border-blue-500 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105">
              Contact HR Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;