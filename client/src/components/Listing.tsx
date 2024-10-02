// components/ListingCard.tsx

import React from 'react';

interface ListingCardProps {
    listing: {
        id: string;
        address: string;  // Ensure address is included
        details?: {      // Use optional chaining for details
            name: string;
            price: number;
            description: string;
            type: string[];
            bedrooms: number;
            bathrooms: number;
            parking: number;
            size: number;
        };
    };
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4">
                <h2 className="text-xl font-bold">{listing.details?.name}</h2>
                <p className="text-gray-600">Price: €{listing.details?.price}</p>
                <p className="mt-2">{listing.details?.description}</p>
                <p className="mt-2">ID: {listing.id}</p>
                <p className="mt-2">Address: {listing.address}</p>
                {/* Optionally display more details */}
                <p className="mt-2">Type: {listing.details?.type.join(', ')}</p>
                <p className="mt-2">Bedrooms: {listing.details?.bedrooms}</p>
                <p className="mt-2">Bathrooms: {listing.details?.bathrooms}</p>
                <p className="mt-2">Parking: {listing.details?.parking}</p>
                <p className="mt-2">Size: {listing.details?.size} m²</p>
            </div>
        </div>
    );
};

export default ListingCard;
