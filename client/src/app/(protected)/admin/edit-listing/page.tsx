'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Checkbox } from "../../../../components/ui/checkbox"
import { Input } from "../../../../components/ui/input"
import { Textarea } from "../../../../components/ui/textarea"
import { Button } from "../../../../components/ui/button"
import { Label } from "../../../../components/ui/label"
import { BedDouble, Bath, Car, Expand, Euro, Home, FileText } from 'lucide-react'
import React from 'react'


export default function EditListing() {
  const [formData, setFormData] = useState<{
    type: string[],
    bedrooms: string,
    bathrooms: string,
    parking: string,
    size: string,
    price: string,
    description: string,
    name: string
  }>({
    type: [],
    bedrooms: '',
    bathrooms: '',
    parking: '',
    size: '',
    price: '',
    description: '',
    name: ''
  })

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      type: prev.type.includes(value)
        ? prev.type.filter(t => t !== value)
        : [...prev.type, value]
    }))
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log(formData)
    // Here you would typically send the data to your backend
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 text-center">Edit Property Listing</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <motion.div variants={fadeInUp} className="bg-gray-50 p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label className="text-lg text-gray-700">Property Type</Label>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="villa" 
                      checked={formData.type.includes('villa')}
                      onCheckedChange={() => handleCheckboxChange('villa')}
                      className="border-gray-300 text-black focus:ring-gray-500"
                    />
                    <Label htmlFor="villa" className="text-gray-700">Villa</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="apartment" 
                      checked={formData.type.includes('apartment')}
                      onCheckedChange={() => handleCheckboxChange('apartment')}
                      className="border-gray-300 text-black focus:ring-gray-500"
                    />
                    <Label htmlFor="apartment" className="text-gray-700">Apartment</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-lg text-gray-700 flex items-center">
                  <Home className="w-5 h-5 mr-2" />
                  Property Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Luxury Beachfront Villa"
                  className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
            </div>
            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="bedrooms" className="text-gray-700 flex items-center">
                  <BedDouble className="w-5 h-5 mr-2" />
                  Bedrooms
                </Label>
                <Input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  placeholder="Number of bedrooms"
                  className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms" className="text-gray-700 flex items-center">
                  <Bath className="w-5 h-5 mr-2" />
                  Bathrooms
                </Label>
                <Input
                  id="bathrooms"
                  name="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  placeholder="Number of bathrooms"
                  className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parking" className="text-gray-700 flex items-center">
                  <Car className="w-5 h-5 mr-2" />
                  Parking Spaces
                </Label>
                <Input
                  id="parking"
                  name="parking"
                  type="number"
                  value={formData.parking}
                  onChange={handleInputChange}
                  placeholder="Number of parking spaces"
                  className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="size" className="text-gray-700 flex items-center">
                  <Expand className="w-5 h-5 mr-2" />
                  Size (m²)
                </Label>
                <div className="relative">
                  <Input
                    id="size"
                    name="size"
                    type="number"
                    value={formData.size}
                    onChange={handleInputChange}
                    placeholder="Property size"
                    className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 pr-12"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">m²</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price" className="text-gray-700 flex items-center">
                  <Euro className="w-5 h-5 mr-2" />
                  Price (€)
                </Label>
                <div className="relative">
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Rental price"
                    className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 pr-12"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-2">
              <Label htmlFor="description" className="text-gray-700 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Provide a detailed description of the luxury property..."
                className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 h-32"
              />
            </motion.div>
          </motion.div>
          <motion.div variants={fadeInUp} className="flex justify-end space-x-4">
            <Button type="button" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
              Cancel
            </Button>
            <Button type="submit" className="bg-black text-white hover:bg-gray-800 transition-colors">
              Save Changes
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}