'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Users, Home, Star } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import Navbar from '~/components/navbar'
import { Timeline } from '~/components/timeline'

export default function AboutPage() {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5])

  const timelineData = [
    {
      title: "2017",
      content: (
        <div className="bg-white dark:bg-neutral-900 p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold mb-2">Conception</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Début de l'étude de marché et conception du projet Welkom Home au cœur du Golfe de Saint-Tropez.
          </p>
        </div>
      ),
    },
    {
      title: "2018",
      content: (
        <div className="bg-white dark:bg-neutral-900 p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold mb-2">Lancement</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Lancement officiel de Welkom Home. Notre politique de service, la sélection des partenaires et le dynamisme de nos équipes nous permettent de devenir rapidement une référence qualité.
          </p>
        </div>
      ),
    },
    {
      title: "2020",
      content: (
        <div className="bg-white dark:bg-neutral-900 p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold mb-2">Expansion</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Élargissement de notre réseau de partenaires et de propriétés. Notre concept privilégiant la proximité, la disponibilité et la réactivité limite volontairement notre périmètre d'intervention.
          </p>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div className="bg-white dark:bg-neutral-900 p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold mb-2">Référence locale</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Welkom Home devient une référence qualité locale dans le domaine très spécifique de l'intendance au service des particuliers et des locataires.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-neutral-900 dark:to-neutral-800">
      <Navbar />
      <main className="pt-24 px-6 md:px-12 lg:px-24">
        <motion.div 
          className="flex flex-col items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div style={{ scale }}>
            <Image
              src="/iconlg.png"
              alt="Welkom Home Logo"
              width={150}
              height={150}
              className="mb-8"
            />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 dark:text-white">
            Notre Histoire
          </h1>
        </motion.div>
        
        <motion.div 
          className="max-w-3xl mx-auto space-y-6 text-lg text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p>
            Après une année d'études, de conception et de prise en compte des retours clients, WH voit officiellement le jour début 2018 au cœur du Golfe de Saint-Tropez.
          </p>
          <p>
            La politique de service choisie, la sélection et l'implication des partenaires ainsi que le dynamisme des équipes nous ont permis de devenir rapidement une référence qualité en matière de conciergerie et de mise en relation Propriétaires - Vacanciers sur le golfe.
          </p>
          <p>
            Notre concept privilégiant la proximité, la disponibilité et la réactivité limite volontairement notre périmètre d'intervention. Cela nous aide par ailleurs à participer au développement du tissu économique local en ne faisant appel qu'a des partenaires connus et référencés.
          </p>
          <p>
            Fort de plus de 5 années d'existence, WH est aujourd'hui une référence qualité locale dans le domaine très spécifique de l'intendance au service des particuliers et des locataires.
          </p>
        </motion.div>

        <motion.div
          className="my-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Timeline data={timelineData} />
        </motion.div>

        <motion.div
          className="my-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Calendar, title: "Disponibilité", description: "Nous sommes à votre service 24/7" },
              { icon: Users, title: "Proximité", description: "Une approche personnalisée pour chaque client" },
              { icon: Home, title: "Confort", description: "Nous veillons à votre bien-être" },
              { icon: Star, title: "Excellence", description: "Un service de qualité irréprochable" }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <value.icon className="w-12 h-12 mb-4 text-gold" />
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{value.title}</h3>
                <p className="dark:text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="my-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-white">Découvrez Notre Univers</h2>
          
          <div className="w-full h-[400px]">
            <Canvas>
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <Environment preset="sunset" />
            </Canvas>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          {/* <Image
            src="/vue.jpg"
            alt="Welkom Home Ambiance"
            width={800}
            height={400}
            className="rounded-lg shadow-md mb-8"
          />
          <motion.blockquote 
            className="italic text-2xl text-center my-12 text-gray-800 dark:text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            Votre confiance nous savons la mériter
          </motion.blockquote> */}
        </motion.div>
      </main>
    </div>
  )
}