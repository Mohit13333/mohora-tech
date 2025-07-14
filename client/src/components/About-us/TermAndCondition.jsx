import { useState } from "react";

const TermsAndConditions = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-600/15 to-pink-600/15 rounded-full blur-3xl animate-pulse-slow-delay"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse-gentle"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-20 px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            Terms & <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Conditions</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 mx-auto animate-fade-in-up-delay leading-relaxed">
            Last updated: July 14, 2025
          </p>
        </div>

        {/* Terms Content */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 lg:p-12">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <div className="text-slate-300 space-y-4">
              <p>
                Welcome to Mohora Technologies Pvt Ltd ("Company", "we", "our", "us"). These Terms and Conditions ("Terms") govern your use of our website and services.
              </p>
              <p>
                By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access our services.
              </p>
              <p>
                Our services are intended for users who are at least 18 years old. Persons under 18 are not permitted to use our services.
              </p>
            </div>
          </section>

          {/* Definitions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">2. Definitions</h2>
            <div className="text-slate-300 space-y-4">
              <p>
                <strong>"Services"</strong> refers to the website, applications, and any products or services provided by Mohora Technologies Pvt Ltd.
              </p>
              <p>
                <strong>"User"</strong>, "you", "your" refers to the person accessing or using our Services.
              </p>
              <p>
                <strong>"Content"</strong> refers to text, images, videos, audio, or other materials available through our Services.
              </p>
              <p>
                <strong>"Account"</strong> refers to the personalized section of our Services accessible after registration.
              </p>
            </div>
          </section>

          {/* User Accounts */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts</h2>
            <div className="text-slate-300 space-y-4">
              <p>
                To access certain features of our Services, you may be required to create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain the security of your password and accept all risks of unauthorized access</li>
                <li>Promptly update any information that becomes inaccurate</li>
                <li>Be responsible for all activities that occur under your account</li>
              </ul>
              <p>
                We reserve the right to suspend or terminate accounts that violate these Terms or are suspected of fraudulent activity.
              </p>
            </div>
          </section>

          {/* Our Services */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">4. Our Services</h2>
            <div className="text-slate-300 space-y-4">
              <p>
                Mohora Technologies provides technology solutions including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Software development services</li>
                <li>Web and mobile application development</li>
                <li>Cloud computing solutions</li>
                <li>Technical consulting services</li>
              </ul>
              <p>
                We reserve the right to modify, suspend, or discontinue any part of our Services at any time without prior notice.
              </p>
              <p>
                You understand that we may need to perform maintenance on our Services which may result in temporary interruptions.
              </p>
            </div>
          </section>

          {/* Payments & Fees */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">5. Payments & Fees</h2>
            <div className="text-slate-300 space-y-4">
              <p>
                Certain Services may require payment of fees. You agree to pay all applicable fees as described when you purchase those Services.
              </p>
              <p>
                Fees are non-refundable except as required by law or as expressly stated in these Terms.
              </p>
              <p>
                We may change our fees at any time by posting the changes on our website with advance notice.
              </p>
              <p>
                You are responsible for all taxes associated with your purchase. We may collect applicable taxes when required.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>
            <div className="text-slate-300 space-y-4">
              <p>
                All content, features, and functionality of our Services are owned by Mohora Technologies or its licensors and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                You may not modify, reproduce, distribute, create derivative works, publicly display, or exploit any part of our Services without our express written permission.
              </p>
              <p>
                Any feedback, comments, or suggestions you provide regarding our Services may be used by us without any obligation to you.
              </p>
            </div>
          </section>

          {/* Liability */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">7. Liability</h2>
            <div className="text-slate-300 space-y-4">
              <p>
                To the maximum extent permitted by law, Mohora Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your use or inability to use our Services</li>
                <li>Any unauthorized access to or use of our servers and/or any personal information</li>
                <li>Any interruption or cessation of transmission to or from our Services</li>
                <li>Any bugs, viruses, or similar that may be transmitted through our Services</li>
              </ul>
              <p>
                Our total liability for any claims under these Terms shall not exceed the amount you paid us in the last 12 months.
              </p>
            </div>
          </section>

          {/* Termination */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">8. Termination</h2>
            <div className="text-slate-300 space-y-4">
              <p>
                We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason, including if you breach these Terms.
              </p>
              <p>
                Upon termination, your right to use our Services will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive.
              </p>
              <p>
                You may terminate your account at any time by contacting us at mohoratechnologiespvtltd@gmail.com.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">9. Governing Law</h2>
            <div className="text-slate-300 space-y-4">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
              </p>
              <p>
                Any disputes arising under these Terms will be resolved in the courts located in Bihar, India.
              </p>
            </div>
          </section>

          {/* Changes to Terms */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">10. Changes to Terms</h2>
            <div className="text-slate-300 space-y-4">
              <p>
                We reserve the right to modify these Terms at any time. We will provide notice of significant changes through our website or by email.
              </p>
              <p>
                Your continued use of our Services after changes become effective constitutes acceptance of the new Terms.
              </p>
              <p>
                If you do not agree to the modified Terms, you must stop using our Services.
              </p>
            </div>
          </section>

          {/* Contact Us */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
            <div className="text-slate-300 space-y-4">
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p>
                <strong>Email:</strong> mohoratechnologiespvtltd@gmail.com<br />
                <strong>Phone:</strong> +91 9065269192<br />
              </p>
            </div>
          </section>

          {/* Acceptance */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 mt-8">
            <h3 className="text-xl font-semibold text-white mb-4">Acceptance of Terms</h3>
            <p className="text-slate-300">
              By using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }

        @keyframes pulse-gentle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.02); }
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

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-slow-delay {
          animation: pulse-slow 4s ease-in-out infinite 2s;
        }

        .animate-pulse-gentle {
          animation: pulse-gentle 3s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
};

export default TermsAndConditions;