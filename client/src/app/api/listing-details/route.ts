import { NextResponse } from 'next/server';
import { db } from '~/data/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("request body:", body);

    const newListingDetails = await db.listingDetails.create({
      data: {
        listingId: body.listingId,
        type: body.type,
        bedrooms: body.bedrooms,
        bathrooms: body.bathrooms,
        parking: body.parking,
        size: body.size,
        price: body.price,
        description: body.description,
        name: body.name,
      },
    });

    console.log("new listing details created:", newListingDetails);

    return NextResponse.json(newListingDetails);
  } catch (error) {
    console.error("error creating listing details:", error);
    return NextResponse.json({ error: 'error creating listing details' }, { status: 500 });
  }
}
export async function GET(request: Request) {
    try {
        const listings = await db.listing.findMany({
            include: {
                details: true,
            },
        });
    
        return NextResponse.json(listings);
    } catch (error) {
        return NextResponse.json({ error: 'error fetching listings' }, { status: 500 });
    }
}
