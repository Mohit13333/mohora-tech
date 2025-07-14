import { useState } from "react";

const PrivacyPolicy = () => {
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
            Privacy <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Policy</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 mx-auto animate-fade-in-up-delay leading-relaxed">
            Last updated: July 14, 2025
          </p>
        </div>

        {/* Privacy Content */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 lg:p-12">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <div className="text-slate-300 space-y-4">
              <p>
                Mohora Technologies Pvt Ltd ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
              </p>
              <p>
                Please read this policy carefully. By accessing or using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our practices, please do not use our services.
              </p>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </div>
          </section>

          {/* Definitions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">2. Definitions</h2>
            <div className="text-slate-300 space-y-4">
              <p>
                <strong>"Personal Data"</strong> means any information relating to an identified or identifiable individual.
              </p>
              <p>
                <strong>"Processing"</strong> means any operation performed on Personal Data, such as collection, recording, organization, storage, or disclosure.
              </p>
              <p>
                <strong>"Services"</strong> refers to all products, services, and websites provided by Mohora Technologies.
              </p>
              <p>
                <strong>"User"</strong> or <strong>"You"</strong> means any individual using our Services.
              </p>
            </div>
          </section>

          {/* Data We Collect */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">3. Data We Collect</h2>
            <div className="text-slate-300 space-y-4">
              <p>We collect several types of information from and about users:</p>
              
              <h3 className="text-xl font-semibold text-white mt-6 mb-2">Personal Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and contact details (email, phone number, address)</li>
                <li>Account credentials (username, password)</li>
                <li>Payment information (processed securely by our payment processors)</li>
                <li>Demographic information (age, gender, preferences)</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-white mt-6 mb-2">Usage Data</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP addresses and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on our Services</li>
                <li>Other diagnostic data</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-white mt-6 mb-2">Tracking Technologies</h3>
              <p>We use cookies and similar tracking technologies to track activity on our Services.</p>
            </div>
          </section>

          {/* How We Use Data */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">4. How We Use Data</h2>
            <div className="text-slate-300 space-y-4">
              <p>We use the collected data for various purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and maintain our Services</li>
                <li>To notify you about changes to our Services</li>
                <li>To allow you to participate in interactive features</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information to improve our Services</li>
                <li>To monitor usage of our Services</li>
                <li>To detect, prevent, and address technical issues</li>
                <li>For marketing and promotional purposes (with your consent)</li>
              </ul>
            </div>
          </section>

          {/* Data Sharing */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">5. Data Sharing</h2>
            <div className="text-slate-300 space-y-4">
              <p>We may share your information in the following situations:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Providers:</strong> With third parties who perform services for us (payment processing, data analysis, hosting services)</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, or acquisition</li>
                <li><strong>Legal Requirements:</strong> When required by law or to respond to legal process</li>
                <li><strong>Protection of Rights:</strong> To protect the rights and property of our company, employees, and users</li>
              </ul>
              <p>We do not sell your personal information to third parties.</p>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">6. Data Security</h2>
            <div className="text-slate-300 space-y-4">
              <p>
                We implement appropriate technical and organizational measures to protect your Personal Data. However, no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
              <p>
                Security measures we employ include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption of sensitive data</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication procedures</li>
                <li>Secure network architecture</li>
              </ul>
              <p>
                You are responsible for keeping your account credentials confidential. Notify us immediately of any unauthorized use of your account.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
            <div className="text-slate-300 space-y-4">
              <p>Depending on your jurisdiction, you may have the following rights regarding your Personal Data:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request copies of your personal data</li>
                <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
                <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                <li><strong>Restriction:</strong> Request restriction of processing</li>
                <li><strong>Objection:</strong> Object to our processing of your data</li>
                <li><strong>Portability:</strong> Request transfer of your data to another organization</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent at any time</li>
              </ul>
              <p>
                To exercise these rights, please contact us at the information provided below. We may need to verify your identity before fulfilling your request.
              </p>
            </div>
          </section>

          {/* Cookies & Tracking */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">8. Cookies & Tracking</h2>
            <div className="text-slate-300 space-y-4">
              <p>
                We use cookies and similar tracking technologies to track activity on our Services and hold certain information.
              </p>
              <p>
                Cookies are files with small amounts of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
              <p>
                We use both session cookies (which expire when you close your browser) and persistent cookies (which stay on your device until they expire or you delete them).
              </p>
              <p>
                Examples of cookies we use:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Necessary for the website to function</li>
                <li><strong>Preference Cookies:</strong> Remember your preferences</li>
                <li><strong>Analytics Cookies:</strong> Track usage and performance</li>
                <li><strong>Marketing Cookies:</strong> Track effectiveness of campaigns</li>
              </ul>
            </div>
          </section>

          {/* Third Parties */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">9. Third Parties</h2>
            <div className="text-slate-300 space-y-4">
              <p>
                Our Services may contain links to third-party websites or services that are not operated by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
              </p>
              <p>
                Some third parties we work with include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment processors (Stripe, PayPal)</li>
                <li>Analytics providers (Google Analytics)</li>
                <li>Cloud service providers (AWS, Google Cloud)</li>
                <li>Customer support platforms</li>
              </ul>
              <p>
                We recommend reviewing the Privacy Policy of every site you visit.
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">10. Children's Privacy</h2>
            <div className="text-slate-300 space-y-4">
              <p>
                Our Services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
              </p>
              <p>
                If we learn we have collected personal information from a child under 13 without verification of parental consent, we will delete that information.
              </p>
              <p>
                If you believe we might have any information from or about a child under 13, please contact us immediately.
              </p>
            </div>
          </section>

          {/* Policy Changes */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">11. Policy Changes</h2>
            <div className="text-slate-300 space-y-4">
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
              <p>
                We will let you know via email and/or a prominent notice on our Services prior to changes becoming effective.
              </p>
              <p>
                You are advised to review this Privacy Policy periodically for any changes. Changes are effective when posted.
              </p>
            </div>
          </section>

          {/* Contact Us */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">12. Contact Us</h2>
            <div className="text-slate-300 space-y-4">
              <p>
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <p>
                <strong>By email:</strong> mohoratechnologiespvtltd@gmail.com<br />
                <strong>By phone:</strong> +91 9065269192<br />
              </p>
            </div>
          </section>

          {/* Acceptance */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 mt-8">
            <h3 className="text-xl font-semibold text-white mb-4">Acknowledgement</h3>
            <p className="text-slate-300">
              By using our Services, you acknowledge that you have read and understood this Privacy Policy and consent to the collection, use, and disclosure of your information as described herein.
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

export default PrivacyPolicy;