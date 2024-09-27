'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card"
import { Label } from "~/components/ui/label"
import { MapPin } from "lucide-react"
import { toast } from 'sonner'
import { NewListing } from "~/actions/listing"
import { useRouter } from 'next/navigation'
// Note: You'll need to replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual Google Maps API key
const GOOGLE_MAPS_API_KEY = 'AIzaSyD94MyKaZyi0JlNdGdmsamM59Ma5Gg4AoQ'

export default function AddListing() {
    const router = useRouter();
    const [address, setAddress] = useState('')
    const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 })
    const [loading, setLoading] = useState(false) // État de chargement
    const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
    useEffect(() => {
        const loadGoogleMapsScript = () => {
            const script = document.createElement('script')
            script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`
            script.async = true
            script.onload = initializeAutocomplete
            document.body.appendChild(script)
        }

        loadGoogleMapsScript()
    }, [])

    const initializeAutocomplete = () => {
        const input = document.getElementById('address-input')

        if (input instanceof HTMLInputElement) {
            autoCompleteRef.current = new window.google.maps.places.Autocomplete(input, { types: ['address'] })

            autoCompleteRef.current.addListener('place_changed', () => {
                const place = autoCompleteRef.current?.getPlace()
                if (place && place.geometry) {
                    setAddress(place.formatted_address || '')
                    setCoordinates({
                        lat: place.geometry.location ? place.geometry.location.lat() : 0,
                        lng: place.geometry.location ? place.geometry.location.lng() : 0,
                    })
                }
            })
        } else {
            console.error('Address input element not found or is not an HTMLInputElement.')
        }
    }

    const handleSave = async () => {
        setLoading(true); // Activer le chargement
        try {
            // Appeler la fonction addListing
            const newListing = await NewListing(address, `${coordinates.lat},${coordinates.lng}`, 'user@example.com'); // Remplace 'user@example.com' par l'email de l'utilisateur
            toast("New listing added successfully");
            console.log('New Listing:', newListing);
            router.replace('/admin/edit-listing/' + newListing.id);
        } catch (error) {
            console.error('Error while saving listing:', error);
            toast("Error while adding new listing");
        } finally {
            setLoading(false); // Désactiver le chargement
        }
    }

    return (
        <Card className="w-full max-w-md shadow-xl">
            <CardHeader className="space-y-1">
                <CardTitle className="text-3xl font-bold text-center">Add New Listing</CardTitle>
                <CardDescription className="text-center">Enter the details for your luxury property</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="address-input">Property Address</Label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <Input
                            id="address-input"
                            placeholder="Enter address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>
                {coordinates.lat !== 0 && coordinates.lng !== 0 && (
                    <div className="text-sm text-gray-600">
                        Coordinates: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                    </div>
                )}
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={handleSave} disabled={loading}>
                    {loading ? 'Saving...' : 'Save Listing'} {/* Changer le texte du bouton selon l'état de chargement */}
                </Button>
            </CardFooter>
        </Card>
    )
}
