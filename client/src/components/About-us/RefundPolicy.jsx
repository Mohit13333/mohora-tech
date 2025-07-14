import { useState } from "react";

const RefundPolicy = () => {
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
            Refund & <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Cancellation</span> Policy
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 mx-auto animate-fade-in-up-delay leading-relaxed">
            Last updated: July 14, 2025
          </p>
        </div>

        {/* Policy Content */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 lg:p-12">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <div className="text-slate-300 space-y-4">
              <p>
                At Mohora Technologies Pvt Ltd, we strive to provide excellent service and quality products. This Refund and Cancellation Policy outlines the terms under which refunds and cancellations are processed for our services.
              </p>
              <p>
                Please read this policy carefully before making any purchases. By using our services, you agree to be bound by this policy.
              </p>
            </div>
          </section>

          {/* Digital Products */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">2. Digital Products & Services</h2>
            <div className="text-slate-300 space-y-4">
              <h3 className="text-xl font-semibold text-white mt-6 mb-2">Refund Eligibility</h3>
              <p>Refunds for digital products and services are provided under the following conditions:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The product is defective or doesn't function as described</li>
                <li>You haven't downloaded or accessed the product</li>
                <li>The request is made within 7 days of purchase</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-white mt-6 mb-2">Non-Refundable Items</h3>
              <p>The following are generally not eligible for refunds:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Products that have been downloaded or accessed</li>
                <li>Services that have already been performed</li>
                <li>Custom-developed software or solutions</li>
                <li>Products purchased during a sale or promotion</li>
              </ul>
            </div>
          </section>

          {/* Subscription Services */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">3. Subscription Services</h2>
            <div className="text-slate-300 space-y-4">
              <h3 className="text-xl font-semibold text-white mt-6 mb-2">Cancellation Policy</h3>
              <p>You may cancel your subscription at any time:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cancellations take effect at the end of the current billing cycle</li>
                <li>No prorated refunds for partial months</li>
                <li>You will continue to have access until the end of your paid period</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-white mt-6 mb-2">Refund Policy</h3>
              <p>Subscription refunds are handled as follows:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Annual subscriptions may be refunded within 30 days of purchase</li>
                <li>Monthly subscriptions are generally non-refundable</li>
                <li>Refunds may be issued at our discretion for exceptional circumstances</li>
              </ul>
            </div>
          </section>

          {/* Service Cancellations */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">4. Service Cancellations</h2>
            <div className="text-slate-300 space-y-4">
              <h3 className="text-xl font-semibold text-white mt-6 mb-2">Custom Development Services</h3>
              <p>Cancellation of custom development projects:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Projects may be cancelled at any time with written notice</li>
                <li>Client is responsible for payment of all work completed up to cancellation</li>
                <li>Deposits are non-refundable once work has commenced</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-white mt-6 mb-2">Consulting Services</h3>
              <p>Cancellation of scheduled consulting sessions:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>24+ hours notice: Full refund or reschedule</li>
                <li>Less than 24 hours notice: 50% refund or reschedule</li>
                <li>No-show: No refund</li>
              </ul>
            </div>
          </section>

          {/* Refund Process */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">5. Refund Process</h2>
            <div className="text-slate-300 space-y-4">
              <h3 className="text-xl font-semibold text-white mt-6 mb-2">How to Request a Refund</h3>
              <p>To request a refund:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Contact our support team at mohoratechnologiespvtltd@gmail.com</li>
                <li>Include your order number and reason for refund</li>
                <li>We will review your request within 3-5 business days</li>
                <li>If approved, refund will be processed to your original payment method</li>
              </ol>
              
              <h3 className="text-xl font-semibold text-white mt-6 mb-2">Processing Time</h3>
              <p>Refund processing times:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Credit/Debit Cards: 5-10 business days</li>
                <li>PayPal: 3-5 business days</li>
                <li>Bank Transfers: 7-14 business days</li>
              </ul>
              <p>Note: The time it takes for the refund to appear in your account depends on your financial institution.</p>
            </div>
          </section>

          {/* Special Circumstances */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">6. Special Circumstances</h2>
            <div className="text-slate-300 space-y-4">
              <h3 className="text-xl font-semibold text-white mt-6 mb-2">Duplicate Charges</h3>
              <p>In case of duplicate charges:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contact us immediately</li>
                <li>We will verify and refund any duplicate payments</li>
                <li>Processing time is typically 3-5 business days</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-white mt-6 mb-2">Service Interruptions</h3>
              <p>For significant service interruptions:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>We may issue service credits or partial refunds at our discretion</li>
                <li>Credit amounts depend on the duration and severity of the interruption</li>
                <li>Does not apply to scheduled maintenance</li>
              </ul>
            </div>
          </section>

          {/* Policy Changes */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">7. Policy Changes</h2>
            <div className="text-slate-300 space-y-4">
              <p>
                We reserve the right to modify this Refund and Cancellation Policy at any time. Changes will be effective immediately upon posting to our website.
              </p>
              <p>
                For significant changes, we will notify customers via email or through our services.
              </p>
              <p>
                Continued use of our services after changes constitutes acceptance of the modified policy.
              </p>
            </div>
          </section>

          {/* Contact Us */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">8. Contact Us</h2>
            <div className="text-slate-300 space-y-4">
              <p>
                For questions about our Refund and Cancellation Policy:
              </p>
              <p>
                <strong>Email:</strong> mohoratechnologiespvtltd@gmail.com<br />
                <strong>Phone:</strong> +91 9065269192<br />
                <strong>Business Hours:</strong> Monday-Friday, 9:00 AM to 5:00 PM IST
              </p>
              <p>
                Please include your order details and reason for contacting us to help us serve you better.
              </p>
            </div>
          </section>

          {/* Acknowledgement */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 mt-8">
            <h3 className="text-xl font-semibold text-white mb-4">Customer Acknowledgement</h3>
            <p className="text-slate-300">
              By using our services, you acknowledge that you have read, understood, and agree to be bound by this Refund and Cancellation Policy. This policy does not affect your statutory rights as a consumer.
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

export default RefundPolicy;