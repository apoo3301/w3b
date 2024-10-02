import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../client/src/data/db"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const listings = await db.listing.findMany({
        include: {
          details: true, // Include details for each listing
          ListingImage: true, // Include images if needed
        },
      });
      res.status(200).json(listings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch listings" });
    }
  } else if (req.method === "POST") {
    const { address, coordinates, createdBy, details } = req.body;

    try {
      const newListing = await db.listing.create({
        data: {
          address,
          coordinates,
          createdBy,
          details: {
            create: details, // Create listing details
          },
        },
      });
      res.status(201).json(newListing);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create listing" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
