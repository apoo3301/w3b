"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { BedDouble, Bath, Car, Expand, Euro, Home, FileText } from 'lucide-react';

export default function EditListing() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    type: [] as string[],
    name: '',
    bedrooms: '',
    bathrooms: '',
    parking: '',
    size: '',
    price: '',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const formDataToSend = {
      ...formData,
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      parking: Number(formData.parking),
      size: Number(formData.size),
      price: Number(formData.price),
      listingId: id
    };

    try {
      const response = await fetch('/api/listing-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });

      if (response.ok) {
        console.log('ListingDetails saved successfully');
      } else {
        console.error('Failed to save ListingDetails');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  function handleCheckboxChange(type: string) {
    setFormData((prevData) => {
      if (prevData.type.includes(type)) {
        return {
          ...prevData,
          type: prevData.type.filter((t) => t !== type),
        };
      } else {
        return {
          ...prevData,
          type: [...prevData.type, type],
        };
      }
    });
  }

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 text-center">Edit Luxury Property Listing</h1>
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
                    placeholder="Property price"
                    className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 pr-12"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-2">
              <Label htmlFor="description" className="text-lg text-gray-700 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Property description"
                className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              />
            </motion.div>
            <motion.div variants={fadeInUp} className="flex justify-end">
              <Button
                type="submit"
                className="bg-black text-white hover:bg-gray-800 transition duration-300"
              >
                Update Listing
              </Button>
            </motion.div>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
