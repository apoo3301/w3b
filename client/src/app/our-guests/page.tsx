"use client"

import React from 'react';
import ListingCard from '~/components/Listing';

interface ListingDetails {
  id: string;
  address: string;
  details?: {
      name: string;
      price: number;
      description: string;
      type: string[];
      bedrooms: number;
      bathrooms: number;
      parking: number;
      size: number;
  };
}

export default function ListingPage() {
  const [listings, setListings] = React.useState<ListingDetails[]>([]);

    React.useEffect(() => {
        const fetchListings = async () => {
            const response = await fetch('/api/listing-details');
            const data = await response.json();
            console.log(data);
            setListings(data);
        };

        fetchListings();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
            ))}
        </div>
    );
}
