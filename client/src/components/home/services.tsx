import { motion } from 'framer-motion'
import { services } from '~/lib/constants';
import React from 'react'

const ServicesComp = () => {
    return (
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
    )
}

export default ServicesComp
