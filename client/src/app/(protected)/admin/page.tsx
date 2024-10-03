"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { toast } from "sonner"
import { Edit, Trash2, Plus, Search } from "lucide-react"

import { Card, CardHeader, CardContent, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"

interface Listing {
  id: string
  createdAt: string
  details?: {
    name: string
    price: number
    description: string
    type: string[]
    bedrooms: number
    bathrooms: number
    parking: number
    size: number
  }
}

export default function AdminPage() {
  const [activeListings, setActiveListings] = useState<Listing[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [listingToDelete, setListingToDelete] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchActiveListings = async () => {
      try {
        const response = await fetch("/api/listing-details?active=true")
        const data: Listing[] = await response.json()

        if (response.ok) {
          setActiveListings(data)
        } else {
          toast.error("Error fetching active listings")
        }
      } catch (error) {
        console.error("Error fetching listings:", error)
        toast.error("An error occurred while fetching listings")
      }
    }

    fetchActiveListings()
  }, [])

  const handleEdit = (id: string) => {
    router.push('/admin/edit-listing/' + id)
  }

  const handleDelete = async () => {
    if (!listingToDelete) return

    try {
      const response = await fetch(`/api/listing-details/${listingToDelete}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setActiveListings((prev) => prev.filter((listing) => listing.id !== listingToDelete))
        toast.success("Listing deleted successfully")
      } else {
        const errorData = await response.json()
        toast.error(`Error deleting listing: ${errorData.error}`)
      }
    } catch (error) {
      console.error("Error deleting listing:", error)
      toast.error("An error occurred while deleting the listing.")
    } finally {
      setIsDeleteDialogOpen(false)
      setListingToDelete(null)
    }
  }

  const filteredListings = activeListings.filter((listing) =>
    listing.details?.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Active Listings</CardTitle>
          <Link href="/admin/add-listing">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Listing
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search listings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"

            />
          </div>
          {filteredListings.length === 0 ? (
            <p className="text-center text-gray-500">No active listings available.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Id</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredListings.map((listing) => (
                  <TableRow key={listing.id}>
                    <TableCell className="font-medium">{listing.details?.id}</TableCell>
                    <TableCell className="font-medium">{listing.details?.name}</TableCell>
                    <TableCell>${listing.details?.price.toLocaleString()}</TableCell>
                    <TableCell>{new Date(listing.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button onClick={() => handleEdit(listing.id)} variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:bg-red-100"
                              onClick={() => setListingToDelete(listing.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Confirm Deletion</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete this listing? This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button variant="destructive" onClick={handleDelete}>
                                Delete
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}