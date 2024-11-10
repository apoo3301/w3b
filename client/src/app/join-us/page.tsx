'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import Navbar from '~/components/navbar'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Star, Shield, Gem } from 'lucide-react'

export default function JoinUs() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-neutral-900 dark:to-neutral-800">
      <Navbar />
      <main className="pt-24 px-4 sm:px-6 lg:px-8">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6"
          >
            Join Our Exclusive Network of
            <span className="block text-gold">Luxury Property Owners</span>
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="mt-3 max-w-md mx-auto text-xl text-gray-500 dark:text-gray-300 sm:text-2xl md:mt-5 md:max-w-3xl"
          >
            Elevate your property&apos;s potential with our premier concierge services
          </motion.p>
          <motion.div 
            variants={fadeInUp}
            className="mt-10 flex justify-center"
          >
            <a
              href="#apply"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-full text-black bg-gold hover:bg-blue-200 md:py-4 md:text-lg md:px-10 transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
            >
              Apply Now
              <ArrowRight className="ml-2" />
            </a>
          </motion.div>
        </motion.section>

        <motion.section
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerChildren}
          className="mt-32 max-w-7xl mx-auto"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-16"
          >
            Why Partner With Us?
          </motion.h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Star, title: "Premium Guest Curation", description: "We attract high-quality guests who appreciate and respect luxury properties." },
              { icon: Shield, title: "Comprehensive Property Care", description: "Our team ensures your property is maintained to the highest standards." },
              { icon: Gem, title: "Maximized Revenue", description: "Optimize your property's earning potential with our dynamic pricing strategy." }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-gold text-white">
                  <feature.icon size={32} />
                </div>
                <h3 className="mt-8 text-xl font-semibold text-gray-900 dark:text-white text-center">{feature.title}</h3>
                <p className="mt-4 text-gray-500 dark:text-gray-400 text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          animate={controls}
          variants={staggerChildren}
          className="mt-32 max-w-4xl mx-auto"
          id="apply"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-8"
          >
            Ready to Elevate Your Property?
          </motion.h2>
          <motion.form 
            variants={fadeInUp}
            className="bg-white dark:bg-neutral-800 shadow-xl rounded-lg p-8"
          >
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold focus:ring-gold dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold focus:ring-gold dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="property" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Property Description
                </label>
                <textarea
                  name="property"
                  id="property"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold focus:ring-gold dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                  placeholder="Tell us about your property..."
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-gold hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Submit Application
                </button>
              </div>
            </div>
          </motion.form>
        </motion.section>

        <motion.section
          initial="hidden"
          animate={controls}
          variants={staggerChildren}
          className="mt-32 mb-16 max-w-7xl mx-auto text-center"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8"
          >
            Join Our Exclusive Network Today
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300"
          >
            Don&apos;t miss this opportunity to be part of the most prestigious property network in Saint-Tropez. Let&apos;s create exceptional experiences together.
          </motion.p>
          <motion.div 
            variants={fadeInUp}
            className="mt-10 flex justify-center"
          >
          </motion.div>
        </motion.section>
      </main>
    </div>
  )
}