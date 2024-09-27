'use client'

import { images, services, bentoImages, testimonials, lifestyleImages, languages } from "~/lib/constants";
import { ArrowRight, Clock, Lock, DollarSign, Star, Menu, X, LogIn, Instagram, Facebook, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import EngagementComp from '~/components/home/engagement';
import CustomersComp from '~/components/home/customers';
import ContactFormComp from '~/components/home/contact';
import LifestyleComp from '~/components/home/lifestyle';
import ServicesComp from '~/components/home/services';
import { LayoutGrid } from '~/components/layoutGrid';
import { useState, useEffect, useRef } from 'react';
import OffersComp from '~/components/home/offers';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import UserButton from '~/components/home/userButton';
import UserBtn from "~/components/home/userButton";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const parallaxRef = useRef(null)
  const [currentLanguage, setCurrentLanguage] = useState('fr')
  const { data: session } = useSession();
  const [windowWidth, setWindowWidth] = useState(0)

  const handleClick = () => {
    window.location.href = "/auth/login"
  }

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
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden'
  }

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

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
              <svg preserveAspectRatio="none" data-bbox="166.99 353.7 284.01 212.3" viewBox="166.99 353.7 284.01 212.3" xmlns="http://www.w3.org/2000/svg" data-type="shape" role="presentation" aria-hidden="true">
                <g>
                  <path d="M421.89 532.62V387.07c0-7.9.73-13.64 2.19-17.23s4.16-6.05 8.08-7.38c3.93-1.34 10.21-2.15 18.84-2.46v-6.3c-13.19.61-15.54.92-43.31.92-25.36 0-44.96-.3-58.79-.92v6.3c8.75.31 15.1 1.12 19.02 2.46 3.93 1.32 6.6 3.79 7.99 7.38 1.4 3.59 2.1 9.33 2.1 17.23v111.07l-70.15-92.92-7.32 9.08-79 113.68V387.07c0-7.9.73-13.64 2.18-17.23 1.46-3.59 4.16-6.05 8.09-7.38 3.93-1.34 10.21-2.15 18.83-2.46v-6.3c-13.19.61-15.53.92-43.31.92-25.36 0-26.51-.3-40.34-.92v6.3c8.75.31 15.1 1.12 19.02 2.46 3.93 1.32 6.6 3.79 7.99 7.38 1.4 3.59 2.1 9.33 2.1 17.23v145.55c0 7.89-.7 13.64-2.1 17.22-1.39 3.59-4.06 6.05-7.99 7.38-3.93 1.33-10.27 2.15-19.02 2.46v6.3c13.83-.61 14.98-.92 40.34-.92 27.91 0 30.25.31 43.31.92v-6.3c-8.62-.31-14.9-1.13-18.83-2.46-3.93-1.33-6.63-3.8-8.09-7.38-.45-1.12-.71-2.84-1.03-4.39 1.33-5.56 4.79-12.55 10.45-21.01l56.02-82.4 79.81 103.61c1.22 1.64 3.52 4.42 5.25 6.7-1.52 2.14-3.46 3.9-6.3 4.86-3.93 1.33-10.27 2.15-19.02 2.46v6.3c13.83-.61 33.42-.92 58.79-.92 27.9 0 30.24.31 43.31.92v-6.3c-8.63-.31-14.9-1.13-18.84-2.46-3.93-1.33-6.63-3.8-8.08-7.38-1.46-3.57-2.19-9.32-2.19-17.21"></path>
                  <path d="M293.43 547.71V566h10.95v-18.29h-10.95z"></path>
                </g>
              </svg>
              <Link href="/" className={scrolled ? 'text-gray-800' : 'text-white'}>
                Welkom Home.
              </Link>
            </motion.div>
            <div className="hidden md:flex items-center space-x-6">
              {['Nos Hôtes', 'Nous Rejoindre', 'A propos'].map((item) => (
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
              <a
                href="https://www.instagram.com/welkomhome"
                target="_blank"
                rel="noopener noreferrer"
                className={`${scrolled ? 'text-gray-800 hover:text-gold' : 'text-white hover:text-gold'
                  } transition-colors`}
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/welkomhome"
                target="_blank"
                rel="noopener noreferrer"
                className={`${scrolled ? 'text-gray-800 hover:text-gold' : 'text-white hover:text-gold'
                  } transition-colors`}
              >
                <Facebook size={20} />
              </a>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className={`flex items-center ${scrolled ? 'text-gray-800 hover:text-gold' : 'text-white hover:text-gold'
                      } transition-colors`}
                  >
                    {languages.find(lang => lang.code === currentLanguage)?.flag}
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-40">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className="flex items-center w-full px-2 py-1 hover:bg-gray-100"
                      onClick={() => setCurrentLanguage(lang.code)}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </button>
                  ))}
                </PopoverContent>
              </Popover>
              {session ? (
                <UserBtn userName={session.user.name ?? ''} userImage={session.user.image ?? ''} userEmail={session.user.email ?? ''} scrolled={scrolled} />
              ) : (
                <motion.button
                  className={`flex items-center ${scrolled ? 'text-gray-800 hover:text-gold' : 'text-white hover:text-gold'
                    } transition-colors`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClick}
                >
                  <LogIn className="mr-2" size={20} />
                  Se connecter
                </motion.button>
              )}
            </div>
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className={`${scrolled ? 'text-gray-800' : 'text-white'} focus:outline-none`}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white overflow-y-auto"
          >
            <div className="flex flex-col items-center justify-start min-h-screen p-4">
              <button
                onClick={toggleMenu}
                className="absolute top-4 right-4 text-gray-800 focus:outline-none"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
              <div className="flex flex-col items-center space-y-3 mt-16 mb-6">
                {['Nos Hôtes', 'Nous Rejoindre', 'A propos'].map((item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-lg sm:text-xl text-gray-800 hover:text-gold transition-colors"
                    onClick={toggleMenu}
                  >
                    {item}
                  </Link>
                ))}
              </div>
              <div className="w-full max-w-xs flex justify-center mb-6">
                {session ? (
                  <UserBtn
                    userName={session.user.name ?? ''}
                    userImage={session.user.image ?? ''}
                    userEmail={session.user.email ?? ''}
                    scrolled={scrolled}
                  />
                ) : (
                  <motion.button
                    className="flex items-center justify-center w-full px-4 py-2 text-black bg-gold rounded-full transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleClick()
                      toggleMenu()
                    }}
                  >
                    <LogIn className="mr-2" size={20} />
                    Se connecter
                  </motion.button>
                )}
              </div>
              <div className="flex flex-col items-center space-y-3">
                <div className="flex space-x-4">
                  <a
                    href="https://www.instagram.com/welkomhome"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-gold transition-colors"
                    onClick={toggleMenu}
                  >
                    <Instagram size={windowWidth < 640 ? 20 : 24} />
                  </a>
                  <a
                    href="https://www.facebook.com/welkomhome"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-gold transition-colors"
                    onClick={toggleMenu}
                  >
                    <Facebook size={windowWidth < 640 ? 20 : 24} />
                  </a>
                </div>
                <div className="relative">
                  <button
                    className="flex items-center text-gray-800 hover:text-gold transition-colors"
                    onClick={() => {
                      const dropdown = document.getElementById('language-dropdown-mobile')
                      if (dropdown) {
                        dropdown.classList.toggle('hidden')
                      }
                    }}
                  >
                    {languages.find(lang => lang.code === currentLanguage)?.flag}
                    <span className="ml-2">{languages.find(lang => lang.code === currentLanguage)?.name}</span>
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                  <div id="language-dropdown-mobile" className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg hidden">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
                        onClick={() => {
                          setCurrentLanguage(lang.code)
                          const dropdown = document.getElementById('language-dropdown-mobile')
                          if (dropdown) {
                            dropdown.classList.add('hidden')
                          }
                          toggleMenu()
                        }}
                      >
                        <span className="mr-2">{lang.flag}</span>
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


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
            <h1 className="text-5xl md:text-7xl mb-4">
              <span className="font-thin">Welkom</span> <span className="font-light">Home</span>
            </h1>
            <p className="text-xl md:text-2xl font-light">Expérience de luxe dans le Golfe de Saint-Tropez</p>
            <motion.button
              className="mt-8 px-6 py-3 bg-gold text-white rounded-full text-lg font-semibold hover:bg-gray-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Découvrir nos services
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      <ServicesComp />
      <EngagementComp />
      <OffersComp />
      <CustomersComp />
      <LifestyleComp />
      <ContactFormComp />
    </div>
  )
}