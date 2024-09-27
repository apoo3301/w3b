"use client";

import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { MapPinIcon } from 'lucide-react';
import React from 'react';
import Head from 'next/head';


interface GoogleAddressSearchProps {
  selectedAddress: (place: any) => void;
  setCoordinates: (coords: { lat: number; lng: number }) => void;
}

function GoogleAddressSearch({ selectedAddress, setCoordinates }: GoogleAddressSearchProps) {
  return (
    <div className='flex gap-2 items-center w-full'>
      <MapPinIcon className='h-10 w-10 p-2 rounded-l-lg text-primary bg-slate-300' />
      <GooglePlacesAutocomplete
        apiKey={process.env.MAPS_API_KEY}
        selectProps={{
          placeholder: 'Search Address',
          isClearable: true,
          className: "w-full",
          onChange: (place) => {
            console.log(place);
            selectedAddress(place)
            if (place) {
              geocodeByAddress(place.label)
                .then(result => getLatLng(result[0]))
                .then(({ lat, lng }) => {
                  //console.log('', { lat, lng });
                  setCoordinates({ lat, lng });
                })
            }
          }
        }}
      />
    </div>
  )
}

export default GoogleAddressSearch;