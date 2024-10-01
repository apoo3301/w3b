"use server"

import { db } from '../data/db';

export const NewListing = async (selectedAddress: string, coordinates: string, userEmail: string) => {
  try {
    const newListing = await db.listing.create({
      data: {
        address: selectedAddress,
        coordinates: coordinates,
        createdBy: userEmail,
      },
    });
    return newListing;
  } catch (error) {
    console.error("Error while adding new listing:", error);
    throw new Error("Error while adding new listing");
  }
};

// export const EditListing = async () => {
//   try {
//     const EditListing = await db.listingDetails.create({
//       data: {
//         // address: selectedAddress,
//         // coordinates: coordinates,
//         // createdBy: userEmail,
//       },
//     });
//     return EditListing;
//   } catch (error) {
//     console.error("Error while adding new listing:", error);
//     throw new Error("Error while adding new listing");
//   }
// };