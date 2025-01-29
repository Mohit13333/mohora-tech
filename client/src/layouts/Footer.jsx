import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 px-6 rounded-md">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <ul className="space-y-2 text-sm">
            <li>
              Contact Email:
              <a
                href="mailto:mohoratechnologiespvtltd@gmail.com"
                className="text-blue-400 hover:underline"
              >
                mohoratechnologiespvtltd@gmail.com
              </a>
            </li>
            <li>
              Phone:
              <a
                href="tel:+919065269192"
                className="text-blue-400 hover:underline"
              >
                +91 9065269192
              </a>
            </li>
            <li>Mon to Fri (09:00 am – 06:00 pm)</li>
            <li>
              Support Team:
              <a
                href="mailto:mohoratechnologiespvtltd@gmail.com"
                className="text-blue-400 hover:underline"
              >
                mohoratechnologiespvtltd@gmail.com
              </a>
            </li>
            <li>
              Sales Team:
              <a
                href="mailto:mohoratechnologiespvtltd@gmail.com"
                className="text-blue-400 hover:underline"
              >
                mohoratechnologiespvtltd@gmail.com
              </a>
            </li>
            <li>
              Business Inquiries:
              <a
                href="mailto:mohoratechnologiespvtltd@gmail.com"
                className="text-blue-400 hover:underline"
              >
                mohoratechnologiespvtltd@gmail.com
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-semibold">Our Services</h4>
          <ul className="space-y-2 text-sm">
            <li>Corporate Certifications</li>
            <li>Product Design and Development</li>
            <li>Web App Development</li>
            <li>Mobile App Development</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-semibold">Important Links</h4>
          <ul className="space-y-2 text-sm">
            <li>Privacy Policy</li>
            <li>Refund & Cancellations</li>
            <li>Terms & Conditions</li>
            <li>Hall of Fame</li>
            <li>Certifications</li>
          </ul>
        </div>
        <div className="flex justify-center items-center">
          <img
            src="https://res.cloudinary.com/mohitsingh8954/image/upload/v1738087360/Figma_basics_1_dnzwnz.svg"
            alt="Infrabyte Solutions Logo"
            className="max-w-full h-auto w-40 md:w-48 lg:w-52"
          />
        </div>
      </div>
      <div className="container mx-auto text-center mt-6">
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://www.facebook.com/share/15uk7YtaNK/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-400 transition"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://www.instagram.com/mohoratechnologies/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 transition"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://www.linkedin.com/company/mohora-techonologies-pvt-ltd/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-600 transition"
          >
            <FaLinkedinIn size={20} />
          </a>
        </div>
        <p>
          &copy; {new Date().getFullYear()} Mohora Technologies PVT LTD. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
