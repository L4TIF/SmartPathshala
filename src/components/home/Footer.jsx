import React from "react";
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const hover = { y: -3 };

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand / About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                C
              </div>
              <div>
                <h3 className="text-lg font-semibold">CourseLab</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Learn whatever, whenever. Trusted by millions worldwide.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.a
                whileHover={hover}
                href="#"
                aria-label="Facebook"
                className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Facebook size={18} />
              </motion.a>
              <motion.a
                whileHover={hover}
                href="#"
                aria-label="Twitter"
                className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Twitter size={18} />
              </motion.a>
              <motion.a
                whileHover={hover}
                href="#"
                aria-label="LinkedIn"
                className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a
                whileHover={hover}
                href="#"
                aria-label="Instagram"
                className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a
                whileHover={hover}
                href="#"
                aria-label="YouTube"
                className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Youtube size={18} />
              </motion.a>
            </div>
          </div>

          {/* Links columns */}
          <nav
            aria-label="Footer"
            className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-6"
          >
            <div>
              <h4 className="font-semibold mb-3">Explore</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <a href="#" className="hover:underline">
                    Catalog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    For Enterprise
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    For Universities
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Browse Subjects
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <a href="#" className="hover:underline">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <a href="#" className="hover:underline">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Accessibility
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* Newsletter / CTA */}
          <div className="space-y-3">
            <h4 className="font-semibold">Stay up to date</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Get course recommendations, discounts, and tips — delivered
              monthly.
            </p>

            <form className="mt-2 flex gap-2">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="you@example.com"
                className="flex-1 rounded-md border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-white text-sm font-medium hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                Subscribe
              </button>
            </form>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              We care about your data. Read our{" "}
              <a href="#" className="underline">
                privacy policy
              </a>
              .
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} CourseLab — All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
            <a href="#" className="hover:underline">
              Accessibility
            </a>
            <a href="#" className="hover:underline">
              Sitemap
            </a>
            <a href="#" className="hover:underline">
              Language
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
