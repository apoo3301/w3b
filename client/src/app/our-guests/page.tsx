'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Bed, Bath, Car, Expand, Euro } from 'lucide-react'
import Navbar from '~/components/navbar'
import { motion } from 'framer-motion'

interface ListingDetails {
  id: string
  address: string
  details?: {
    name: string
    price: number
    description: string
    type: string[]
    bedrooms: number
    bathrooms: number
    parking: number
    size: number
    imageUrl: string
  }
}

export default function Component() {
  const [listings, setListings] = useState<ListingDetails[]>([])

  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch('/api/listing-details')
      const data = await response.json()
      setListings(data)
    }

    fetchListings()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-neutral-900 dark:to-neutral-800">
      <Navbar />
      <header className="py-24 px-4 md:px-6 lg:px-8 bg-white dark:bg-neutral-800 shadow-md relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center pt-16">
            <span className="bg-gradient-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text">
              Our Exclusive Properties
            </span>
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-center text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto"
        >
          Discover unparalleled luxury in the heart of Saint-Tropez
        </motion.p>
      </header>
      <main className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64">
                  <Image
                    src={listing.details?.imageUrl || '/placeholder.svg'}
                    alt={listing.details?.name || 'Property'}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{listing.details?.name}</h2>
                  <p className="text-sm text-gray-500 mb-4">{listing.address}</p>
                  <div className="flex justify-between items-center mb-4">
                    <Badge variant="secondary" className="text-lg font-semibold">
                      <Euro className="w-5 h-5 mr-1" />
                      {listing.details?.price.toLocaleString()} / night
                    </Badge>
                    <div className="flex space-x-2">
                      {listing.details?.type.map((type) => (
                        <Badge key={type} variant="outline">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{listing.details?.description}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {listing.details?.bedrooms} Beds
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      {listing.details?.bathrooms} Baths
                    </div>
                    <div className="flex items-center">
                      <Car className="w-4 h-4 mr-1" />
                      {listing.details?.parking} Parking
                    </div>
                    <div className="flex items-center">
                      <Expand className="w-4 h-4 mr-1" />
                      {listing.details?.size} m²
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}