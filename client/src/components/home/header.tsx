import React, { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { images } from "../../lib/constants";
const HeaderComp = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const { scrollYProgress } = useScroll()
    const parallaxRef = useRef(null)
    const [scrolled, setScrolled] = useState(false)
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
    return (

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
    )
}

export default HeaderComp
