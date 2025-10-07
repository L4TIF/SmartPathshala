import React from "react";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo and About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">EduLearn</h2>
          <p className="text-sm">
            EduLearn is your trusted platform for online learning. Join millions of learners around the world to achieve your goals.
          </p>
        </div>

        {/* Helpful Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Helpful Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/courses" className="hover:text-white">Courses</a></li>
            <li><a href="/blog" className="hover:text-white">Blog</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
            <li><a href="/faq" className="hover:text-white">FAQs</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
            <li><a href="/help" className="hover:text-white">Help Center</a></li>
            <li><a href="/partners" className="hover:text-white">Our Partners</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white"><Facebook size={22} /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white"><Twitter size={22} /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white"><Instagram size={22} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white"><Linkedin size={22} /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white"><Youtube size={22} /></a>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} EduLearn. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
