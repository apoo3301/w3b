import { bentoImages } from '~/lib/constants'
import { motion } from 'framer-motion'
import React from 'react'

const OffersComp = () => {
    return (
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
    )
}

export default OffersComp
