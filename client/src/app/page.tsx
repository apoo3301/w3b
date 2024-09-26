'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Clock, Lock, DollarSign, Star, Menu, X } from 'lucide-react'
import { images, services, bentoImages, testimonials, lifestyleImages } from "~/lib/constants"


export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const parallaxRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    window.addEventListener('scroll', handleScroll)
    return () => {
      clearInterval(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <div className="min-h-screen bg-white">
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
          }`}
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ borderRadius: scrolled ? '0 0 1rem 1rem' : '0' }}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <motion.div
              className="text-2xl font-semibold flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* <svg
                className="w-8 h-8 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"
                  stroke={scrolled ? '#1a202c' : '#ffffff'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 22V12h6v10"
                  stroke={scrolled ? '#1a202c' : '#ffffff'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg> */}
              <svg preserveAspectRatio="none" data-bbox="166.99 353.7 284.01 212.3" viewBox="166.99 353.7 284.01 212.3" xmlns="http://www.w3.org/2000/svg" data-type="shape" role="presentation" aria-hidden="true">
                <g>
                  <path d="M421.89 532.62V387.07c0-7.9.73-13.64 2.19-17.23s4.16-6.05 8.08-7.38c3.93-1.34 10.21-2.15 18.84-2.46v-6.3c-13.19.61-15.54.92-43.31.92-25.36 0-44.96-.3-58.79-.92v6.3c8.75.31 15.1 1.12 19.02 2.46 3.93 1.32 6.6 3.79 7.99 7.38 1.4 3.59 2.1 9.33 2.1 17.23v111.07l-70.15-92.92-7.32 9.08-79 113.68V387.07c0-7.9.73-13.64 2.18-17.23 1.46-3.59 4.16-6.05 8.09-7.38 3.93-1.34 10.21-2.15 18.83-2.46v-6.3c-13.19.61-15.53.92-43.31.92-25.36 0-26.51-.3-40.34-.92v6.3c8.75.31 15.1 1.12 19.02 2.46 3.93 1.32 6.6 3.79 7.99 7.38 1.4 3.59 2.1 9.33 2.1 17.23v145.55c0 7.89-.7 13.64-2.1 17.22-1.39 3.59-4.06 6.05-7.99 7.38-3.93 1.33-10.27 2.15-19.02 2.46v6.3c13.83-.61 14.98-.92 40.34-.92 27.91 0 30.25.31 43.31.92v-6.3c-8.62-.31-14.9-1.13-18.83-2.46-3.93-1.33-6.63-3.8-8.09-7.38-.45-1.12-.71-2.84-1.03-4.39 1.33-5.56 4.79-12.55 10.45-21.01l56.02-82.4 79.81 103.61c1.22 1.64 3.52 4.42 5.25 6.7-1.52 2.14-3.46 3.9-6.3 4.86-3.93 1.33-10.27 2.15-19.02 2.46v6.3c13.83-.61 33.42-.92 58.79-.92 27.9 0 30.24.31 43.31.92v-6.3c-8.63-.31-14.9-1.13-18.84-2.46-3.93-1.33-6.63-3.8-8.08-7.38-1.46-3.57-2.19-9.32-2.19-17.21"></path>
                  <path d="M293.43 547.71V566h10.95v-18.29h-10.95z"></path>
                </g>
              </svg>
              <Link href="/" className={scrolled ? 'text-gray-800' : 'text-white'}>
                elkom Home.
              </Link>
            </motion.div>
            <div className="hidden md:flex space-x-6">
              {['Nos Hôtes', 'Propriétaire', 'A Propos', 'Nous Rejoindre'].map((item) => (
                <motion.div key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className={`${scrolled ? 'text-gray-800' : 'text-white'
                      } hover:text-gold transition-colors`}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className={`${scrolled ? 'text-gray-800' : 'text-white'} focus:outline-none`}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden fixed inset-0 z-40 bg-white"
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {['Services', 'Témoignages', 'Contact'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-2xl text-gray-800 hover:text-gold transition-colors"
                onClick={toggleMenu}
              >
                {item}
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div
        className="relative h-screen overflow-hidden"
        style={{ opacity, scale }}
      >
        <AnimatePresence initial={false}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Luxury image ${currentIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-light mb-4">Welkom Home</h1>
            <p className="text-xl md:text-2xl font-light">Expérience de luxe dans le Golfe de Saint-Tropez</p>
            <motion.button
              className="mt-8 px-6 py-3 bg-gold text-white rounded-full text-lg font-semibold hover:bg-yellow-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Découvrir nos services
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-4xl font-light text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Nos Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.title}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-gold rounded-full mb-6">
                    <IconComponent className="text-black" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">{service.title}</h3>
                  <p className="text-gray-600 text-center">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-4xl font-light text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Notre Engagement
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Grâce à des années d'expérience, nous avons construit une véritable relation de confiance avec nos propriétaires.
            Cela nous permet de vous ouvrir les portes de maisons que nous proposons en exclusivité sur
            WelkomHOME et que vous ne trouverez à louer nulle part ailleurs.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-4xl font-light text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Nos Offres Exclusives
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bentoImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-lg aspect-square"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={image.src}
                  alt={image.text}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-white text-center font-light">{image.text}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="témoignages" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div>
            <motion.h2
              className="text-3xl md:text-4xl font-light text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Témoignages Clients
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03 }}
                >
                  <p className="text-gray-600 mb-4">{testimonial.text}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{testimonial.name}</span>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="text-gold" size={16} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 text-white overflow-hidden" ref={parallaxRef}>
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-4xl font-light text-center mb-12 text-black"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Lifestyle
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {lifestyleImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative h-96 overflow-hidden rounded-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.img
                  src={image}
                  alt={`Lifestyle image ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    y: useTransform(
                      scrollYProgress,
                      [0, 1],
                      [0, index % 2 === 0 ? 100 : -100]
                    ),
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-4xl font-light text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Contactez-nous
          </motion.h2>
          <div className="max-w-2xl mx-auto">
            <motion.form
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div>
                <label htmlFor="name" className="block mb-2 text-gray-700">Nom</label>
                <input type="text" id="name" className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold" required />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-gray-700">Email</label>
                <input type="email" id="email" className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold" required />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 text-gray-700">Message</label>
                <textarea id="message" rows={4} className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold" required></textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full bg-gold text-white py-2 rounded hover:bg-yellow-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Envoyer
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-semibold">Welkom Home</h3>
              <p className="text-sm text-gray-400">Services de Conciergerie de Luxe à Saint-Tropez</p>
            </div>
            <div className="flex space-x-4">
              {['Politique de confidentialité', 'Conditions d\'utilisation', 'Contact'].map((item) => (
                <Link key={item} href="#" className="text-sm hover:text-gold transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Welkom Home. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  )
}