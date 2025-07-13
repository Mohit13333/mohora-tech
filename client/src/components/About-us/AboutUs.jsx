import React from "react";
import { Linkedin, Twitter, Github } from 'lucide-react';
import { Link } from "react-router-dom";

const About = () => {
  const teamMembers = [
    {
      name: "Mohit Singh",
      role: "Founder & CEO",
      bio: "Visionary leader in tech innovation and business strategy.",
      image: "https://res.cloudinary.com/mohitsingh8954/image/upload/v1752427901/1679902923800_leousy.jpg",
      social: {
        linkedin: "https://www.linkedin.com/in/mohit-sing/",
        twitter: "https://x.com/MohitSingh93904"
      }
    },
    {
      name: "Ritesh Singh",
      role: "Founder & CTO",
      bio: "Technology architect specializing in scalable systems and cutting-edge solutions.",
      image: "https://res.cloudinary.com/mohitsingh8954/image/upload/v1752427786/483580332_18003011654732920_3626310804999535660_n_mctxva.jpg",
      social: {
        linkedin: "#",
        github: "#"
      }
    },
    // {
    //   name: "Marcus Chen",
    //   role: "Lead Developer",
    //   bio: "Full-stack developer passionate about creating elegant, efficient code.",
    //   image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    //   social: {
    //     linkedin: "#",
    //     github: "#"
    //   }
    // },
    // {
    //   name: "Sophia Williams",
    //   role: "UX/UI Designer",
    //   bio: "Creative designer focused on intuitive user experiences and beautiful interfaces.",
    //   image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    //   social: {
    //     dribbble: "#",
    //     behance: "#"
    //   }
    // }
  ];

  const milestones = [
    { year: "2015", event: "Company founded with 5 team members" },
    { year: "2017", event: "First major client project completed" },
    { year: "2019", event: "Expanded to international markets" },
    { year: "2021", event: "Reached 100+ employees" },
    { year: "2023", event: "Recognized as Top Tech Innovator" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-600/15 to-pink-600/15 rounded-full blur-3xl animate-pulse-slow-delay"></div>
        </div>

        <div className="relative z-10 px-10 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            About <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Mohora</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-3xl mx-auto animate-fade-in-up-delay leading-relaxed">
            We're a passionate team of innovators, developers, and designers committed to transforming businesses through technology.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 relative">
        <div className="mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Story</span>
              </h2>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Founded in 2025, Mohora Technologies began as a small team of passionate technologists with a vision to bridge the gap between business needs and technological solutions.
              </p>
              <p className="text-slate-300 mb-6 leading-relaxed">
                What started as a modest startup has now grown into a trusted partner for businesses worldwide, delivering innovative solutions that drive growth and efficiency.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Our journey has been marked by continuous learning, adaptation, and an unwavering commitment to excellence.
              </p>
            </div>
            <div className="relative h-96 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-center animate-float-gentle">
              <div className="text-8xl">📈</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-20 relative bg-slate-800/20 backdrop-blur-sm">
        <div className="mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Mission</span> & Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-8 transform hover:scale-[1.02] transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl">💡</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Innovation</h3>
              <p className="text-slate-300">
                We constantly push boundaries to deliver cutting-edge solutions that set our clients apart in their industries.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-8 transform hover:scale-[1.02] transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Integrity</h3>
              <p className="text-slate-300">
                We build trust through transparency, honesty, and delivering on our promises every single time.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-8 transform hover:scale-[1.02] transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Excellence</h3>
              <p className="text-slate-300">
                We pursue perfection in everything we do, ensuring the highest quality standards for our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
<section className="py-20 relative">
  <div className="mx-auto px-6 max-w-7xl">
    <div className="text-center mb-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
        Meet Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Team</span>
      </h2>
      <p className="text-lg text-slate-300 max-w-2xl mx-auto">
        The brilliant minds behind Mohora's success
      </p>
    </div>

    <div className={`flex flex-wrap justify-center gap-8 ${
      teamMembers.length <= 2 ? 'lg:flex-nowrap lg:justify-center' : ''
    }`}>
      {teamMembers.map((member, index) => (
        <div 
          key={index}
          className={`bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-6 transform hover:scale-[1.03] transition-all duration-300 overflow-hidden flex flex-col ${
            teamMembers.length <= 2 ? 'w-full sm:w-96' : 'w-full sm:w-80 lg:w-72 xl:w-80'
          }`}
        >
          <div className="relative group flex-1 min-h-64">
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800/20 rounded-xl overflow-hidden">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover max-h-[300px]"
                style={{ objectPosition: 'top center' }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <div>
                <p className="text-slate-200 text-sm">{member.bio}</p>
                <div className="flex space-x-3 mt-2">
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} className="text-blue-400 hover:text-blue-300">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a href={member.social.twitter} className="text-blue-400 hover:text-blue-300">
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.github && (
                    <a href={member.social.github} className="text-gray-400 hover:text-gray-300">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-bold text-white">{member.name}</h3>
            <p className="text-blue-400 font-medium">{member.role}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Milestones Section */}
      {/* <section className="py-20 relative bg-slate-800/20 backdrop-blur-sm">
        <div className="mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Journey</span>
            </h2>
          </div>

          <div className="relative">
            <div className="hidden sm:block absolute left-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>

            <div className="space-y-12 sm:space-y-0">
              {milestones.map((milestone, index) => (
                <div 
                  key={index}
                  className={`relative flex flex-col sm:flex-row items-center ${index % 2 === 0 ? 'sm:flex-row-reverse' : ''}`}
                >
                  <div className={`flex-1 sm:px-12 py-6 ${index % 2 === 0 ? 'sm:text-right' : 'sm:text-left'}`}>
                    <h3 className="text-2xl font-bold text-white mb-2">{milestone.year}</h3>
                    <p className="text-slate-300">{milestone.event}</p>
                  </div>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-slate-900 flex items-center justify-center relative z-10">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1 sm:px-12 py-6 hidden sm:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl rounded-3xl border border-white/10 p-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Want to Join Our Team?
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our growing team of innovators.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/careers">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>💼</span>
                    <span>View Open Positions</span>
                  </span>
                </button>
              </Link>
              <Link to="/contact">
                <button className="group relative px-8 py-4 bg-slate-800/50 border border-slate-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-slate-700/50 hover:border-slate-500 backdrop-blur-sm">
                  <span className="flex items-center space-x-2">
                    <span>📧</span>
                    <span>Contact Us</span>
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Styles (same as home page) */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-fade-in-up-delay {
          animation: fade-in-up 0.8s ease-out 0.3s both;
        }

        .animate-float-gentle {
          animation: float-gentle 4s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-slow-delay {
          animation: pulse-slow 4s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  );
};

export default About;