import { NextResponse } from 'next/server';
import { db } from '~/data/db';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        console.log(`Deleting listing with ID: ${id}`);
        await db.listingDetails.deleteMany({
            where: { listingId: id },
        });

        const deletedListing = await db.listing.delete({
            where: { id },
        });

        return NextResponse.json(deletedListing);
    } catch (error) {
        console.error("Error deleting listing:", error);
        return NextResponse.json({ error: 'Error deleting listing' }, { status: 500 });
    }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params; // Extract the id from the params

    console.log(`Fetching listing with ID: ${id}`);

    try {
        const listing = await db.listing.findUnique({
            where: { id },
            include: {
                details: true,
            },
        });

        if (!listing) {
            console.warn(`Listing with ID: ${id} not found`);
            return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
        }

        return NextResponse.json(listing);
    } catch (error) {
        console.error("Error fetching listing details:", error);
        return NextResponse.json({ error: 'Error fetching listing details' }, { status: 500 });
    }
}
  