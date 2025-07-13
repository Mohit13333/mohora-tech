import React, { useState, useEffect } from 'react';
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaDollarSign, FaUsers, FaRocket, FaHeart, FaGraduationCap, FaChevronDown, FaChevronUp, FaSpinner, FaCheck, FaTimes, FaUpload } from 'react-icons/fa';

const API_BASE_URL = 'http://localhost:8080/api';

const Career = () => {
  const [jobListings, setJobListings] = useState([]);
  const [expandedJob, setExpandedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [filters, setFilters] = useState({
    department: '',
    location: '',
    type: ''
  });

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Fetch jobs from backend
  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const queryParams = new URLSearchParams();
      if (filters.department) queryParams.append('department', filters.department);
      if (filters.location) queryParams.append('location', filters.location);
      if (filters.type) queryParams.append('type', filters.type);
      
      const response = await fetch(`${API_BASE_URL}/jobs?${queryParams}`);
      const data = await response.json();
      
      if (data.success) {
        setJobListings(data.data);
      } else {
        setError(data.message || 'Failed to fetch jobs');
      }
    } catch (err) {
      setError('Failed to connect to server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const toggleJobExpansion = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
    setApplicationStatus(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors(prev => ({
          ...prev,
          resume: 'File size must be less than 5MB'
        }));
        return;
      }
      
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setFormErrors(prev => ({
          ...prev,
          resume: 'Only PDF and Word documents are allowed'
        }));
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        resume: file
      }));
      
      if (formErrors.resume) {
        setFormErrors(prev => ({
          ...prev,
          resume: ''
        }));
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email format';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.resume) errors.resume = 'Resume is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setApplicationStatus(null);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('jobId', selectedJob.id);
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('coverLetter', formData.coverLetter);
      formDataToSend.append('resume', formData.resume);
      
      const response = await fetch(`${API_BASE_URL}/applications`, {
        method: 'POST',
        body: formDataToSend
      });
      
      const data = await response.json();
      
      if (data.success) {
        setApplicationStatus({
          type: 'success',
          message: 'Application submitted successfully! We will contact you soon.'
        });
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          coverLetter: '',
          resume: null
        });
        // Close form after 3 seconds
        setTimeout(() => {
          setShowApplicationForm(false);
        }, 3000);
      } else {
        setApplicationStatus({
          type: 'error',
          message: data.message || 'Failed to submit application'
        });
      }
    } catch (err) {
      setApplicationStatus({
        type: 'error',
        message: 'Network error. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
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
              <button 
                onClick={() => document.getElementById('jobs-section').scrollIntoView({ behavior: 'smooth' })}
                className="text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                View Open Positions
              </button>
              <button 
                onClick={() => document.getElementById('benefits-section').scrollIntoView({ behavior: 'smooth' })}
                className="text-slate-200 hover:text-white border border-slate-600 hover:border-blue-500 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                Learn About Our Culture
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div id="benefits-section" className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
      <div id="jobs-section" className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Open Positions
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Find your next career opportunity and help us build amazing products.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          <select 
            value={filters.department} 
            onChange={(e) => handleFilterChange('department', e.target.value)}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
          >
            <option value="">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Product">Product</option>
            <option value="Infrastructure">Infrastructure</option>
          </select>
          
          <select 
            value={filters.location} 
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
          >
            <option value="">All Locations</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Delhi">Delhi</option>
            <option value="Remote">Remote</option>
          </select>
          
          <select 
            value={filters.type} 
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <FaSpinner className="animate-spin text-4xl text-blue-400 mx-auto mb-4" />
            <p className="text-slate-300">Loading job listings...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 max-w-md mx-auto">
              <FaTimes className="text-red-400 text-2xl mx-auto mb-4" />
              <p className="text-red-300">{error}</p>
              <button 
                onClick={fetchJobs}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Job Listings */}
        {!loading && !error && (
          <div className="space-y-6">
            {jobListings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-300 text-lg">No jobs found matching your criteria.</p>
                <button 
                  onClick={() => setFilters({ department: '', location: '', type: '' })}
                  className="mt-4 text-blue-400 hover:text-blue-300 transition-colors duration-300"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              jobListings.map((job) => (
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
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApplyClick(job);
                          }}
                          className="text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                        >
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
              ))
            )}
          </div>
        )}
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700/50">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Apply for {selectedJob?.title}</h3>
              <button 
                onClick={() => setShowApplicationForm(false)}
                className="text-slate-400 hover:text-white transition-colors duration-300"
              >
                <FaTimes size={24} />
              </button>
            </div>

            {applicationStatus && (
              <div className={`mb-6 p-4 rounded-lg border ${
                applicationStatus.type === 'success' 
                  ? 'bg-green-900/20 border-green-500/50 text-green-300' 
                  : 'bg-red-900/20 border-red-500/50 text-red-300'
              }`}>
                <div className="flex items-center gap-2">
                  {applicationStatus.type === 'success' ? <FaCheck /> : <FaTimes />}
                  <span>{applicationStatus.message}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                    placeholder="Enter your first name"
                    disabled={isSubmitting}
                  />
                  {formErrors.firstName && (
                    <p className="mt-1 text-sm text-red-400">{formErrors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                    placeholder="Enter your last name"
                    disabled={isSubmitting}
                  />
                  {formErrors.lastName && (
                    <p className="mt-1 text-sm text-red-400">{formErrors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                  placeholder="Enter your email address"
                  disabled={isSubmitting}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-400">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                  placeholder="Enter your phone number"
                  disabled={isSubmitting}
                />
                {formErrors.phone && (
                  <p className="mt-1 text-sm text-red-400">{formErrors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Resume *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="resume-upload"
                    disabled={isSubmitting}
                  />
                  <label
                    htmlFor="resume-upload"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white cursor-pointer hover:border-blue-500 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <FaUpload />
                    {formData.resume ? formData.resume.name : 'Upload Resume (PDF, DOC, DOCX)'}
                  </label>
                </div>
                {formErrors.resume && (
                  <p className="mt-1 text-sm text-red-400">{formErrors.resume}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Cover Letter (Optional)
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Tell us why you're interested in this position..."
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
            <button 
              onClick={() => document.getElementById('jobs-section').scrollIntoView({ behavior: 'smooth' })}
              className="text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
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