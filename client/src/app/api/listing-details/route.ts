import { NextResponse } from 'next/server';
import { db } from '~/data/db';

// Utilisez PUT pour gérer la création et la mise à jour
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        console.log("request body:", body);

        // Vérifiez si les détails de l'annonce existent déjà
        const existingDetails = await db.listingDetails.findUnique({
            where: { listingId: body.listingId },
        });

        if (existingDetails) {
            // Mettre à jour les détails existants
            const updatedDetails = await db.listingDetails.update({
                where: { listingId: body.listingId },
                data: {
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
            console.log("Listing details updated:", updatedDetails);
            return NextResponse.json(updatedDetails);
        } else {
            // Créer de nouveaux détails si aucun détail n'existe
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
            console.log("New listing details created:", newListingDetails);
            return NextResponse.json(newListingDetails);
        }
    } catch (error) {
        console.error("Error creating/updating listing details:", error);
        return NextResponse.json({ error: 'Error creating/updating listing details' }, { status: 500 });
    }
}

// Récupérer les annonces
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const isActive = searchParams.get("active") === 'true';

        let listings;
        if (isActive) {
            listings = await db.listing.findMany({
                where: { active: true },
                include: { details: true },
            });
        } else {
            listings = await db.listing.findMany({
                include: {
                    details: true,
                },
            });
        }

        return NextResponse.json(listings);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching listings' }, { status: 500 });
    }
}
