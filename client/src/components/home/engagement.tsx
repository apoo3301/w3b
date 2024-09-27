import { motion } from 'framer-motion'
import React from 'react'

const EngagementComp = () => {
    return (
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
    )
}

export default EngagementComp
