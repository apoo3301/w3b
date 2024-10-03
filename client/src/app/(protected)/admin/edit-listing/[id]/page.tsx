"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import {ArrowLeft, BedDouble, Bath, Car, Expand, Euro, Home, FileText } from 'lucide-react';

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

  // Fetch existing listing details when component mounts
  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const response = await fetch(`/api/listing-details/${id}`);
        if (!response.ok) throw new Error('Failed to fetch listing details');

        const data = await response.json();
        console.log(data); // Inspectez la réponse

        setFormData({
          type: data.details?.type || [],
          name: String(data.details?.name) || '',
          bedrooms: String(data.details?.bedrooms) || '',
          bathrooms: String(data.details?.bathrooms) || '',
          parking: String(data.details?.parking) || '',
          size: String(data.details?.size) || '',
          price: String(data.details?.price) || '',
          description: data.details?.description || ''
        });
      } catch (error) {
        console.error('Error fetching listing details:', error);
      }
    };

    fetchListingDetails();
  }, [id]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

  async function handleUpdate() {
    const updatedData = {
      listingId: id, // Make sure to include the listingId
      type: formData.type,
      name: formData.name,
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      parking: Number(formData.parking),
      size: Number(formData.size),
      price: Number(formData.price),
      description: formData.description,
    };

    try {
      const response = await fetch(`/api/listing-details`, {
        method: 'PUT', // Change method to PUT for updating
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        console.log('Listing updated successfully');
        router.push('/admin'); // Redirect after update
      } else {
        console.error('Failed to update listing');
        // Handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network or other errors
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleUpdate(); // Call the update function on form submission
  };

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center mb-4 cursor-pointer" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5 mr-2 text-gray-700" />
          <span className="text-gray-700">Retour</span>
        </div>
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
                  value={formData.name} // Assurez-vous que cette valeur est correctement mise à jour
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
                    placeholder="Size in square meters"
                    className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price" className="text-gray-700 flex items-center">
                  <Euro className="w-5 h-5 mr-2" />
                  Price
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Price in Euros"
                  className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
            </motion.div>
            <div className="space-y-2 mb-6">
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
            </div>
            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
              Update Listing
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
