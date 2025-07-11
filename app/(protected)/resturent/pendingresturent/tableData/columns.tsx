"use client"

import { ColumnDef } from "@tanstack/react-table"

import { ArrowUpDown, Blocks, Edit2,    MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useBlockUser, useUnblockUser } from "@/hooks/useDataOverview"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useApproveResturent, useRejectResturent } from "@/hooks/useResturent"
import EditResturentModal from "@/components/EditResturentModal"

export interface Restaurant {
  _id: string;
  name: string;
  address: string;
  contactName: string;
  contactEmail: string;
  cuisine: string[];
  phoneNumber?: string;
  rating: number;
  distanceUnit: string;
  googleMapsPlaceId: string;
  googleMapsUrl: string;
  image: {
    _id: string;
    url: string;
  };
  inWishlists: string[]; // assuming wishlists store user IDs
  isApproved: "pending" | "approved" | "rejected"; // adapt as needed
  location: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  suppliers: string[];
  userId: {
    _id: string;
    email: string;
    name: string;
  };
  createdAt: string; // or Date if parsed
  updatedAt: string; // or Date if parsed
  __v: number;
}


export const columns: ColumnDef<Restaurant>[] = [
  {
    accessorKey: "name",
    cell(props) {
      return (
        <div className="flex items-center gap-x-2">
          <div className="font-medium leading-none">{props.getValue<string>()}</div>
        </div>
      )
    },
    header: () => <div className="font-bold text-zinc-800 pl-0">Name</div>,
  }, 
  {
    accessorKey: "contactEmail",
    header: () => <div className="font-bold text-zinc-800 pl-0">Contact Email</div>,
  },
  {
    accessorKey: "phoneNumber",
    header: () => <div className="font-bold text-zinc-800 pl-0">Phone</div>,
  },
  {
    accessorKey: "cuisine",
    header: () => <div className="font-bold text-zinc-800 pl-0">Cuisine</div>,
    cell: ({ row }) => {
    const cuisineText = row.original.cuisine.join(", ")
    const words = cuisineText.split(" ")
    const shouldTruncate = words.length > 3
    const displayText = shouldTruncate ? words.slice(0, 3).join(" ") + "..." : cuisineText

    return (
      <div className="flex items-center justify-start">
        {displayText}
      </div>
    )
  },
  },
  {
    accessorKey: "suppliers",
    header: () => <div className="font-bold text-zinc-800 pl-0">Suppliers</div>,
    cell: ({ row }) => {
    const cuisineText = row.original.suppliers.join(", ")
    const words = cuisineText.split(" ")
    const shouldTruncate = words.length > 3
    const displayText = shouldTruncate ? words.slice(0, 3).join(" ") + "..." : cuisineText

    return (
      <div className="flex items-center justify-start">
        {displayText}
      </div>
    )
  },
  },
  {
    accessorKey: "rating",
    header: () => <div className="font-bold text-zinc-800 pl-0">Rating</div>,
  },
  {
  accessorKey: "googleMapsUrl",
  cell: ({ row }) => {
    const url = row.original.googleMapsUrl;
    return url ? (
      <Link
        href={url}
        target="_blank"
        className="rounded-full py-1 px-2 bg-green-600 text-white text-xs"
      >
        Google Maps
      </Link>
    ) : (
      <span className="text-xs text-gray-500">N/A</span>
    );
  },
  header: () => <div className="font-bold text-zinc-800 pl-0">Location</div>,
},
  {
    accessorKey: "isApproved",
    header: () => <div className="font-bold text-zinc-800 pl-0">Status</div>,
  },
  {
    accessorKey: "userId",
    header: () => <div className="font-bold text-zinc-800 pl-0">Posted by</div>,
    cell: ({ row }) => <div className="flex items-center justify-start">{row.original.userId.email}</div>,
  },
  {
    accessorKey: "_id",
    header: () => <div className="font-bold text-zinc-800 pl-0">Action</div>,
     cell:({row})=>    {

       const { mutate: rejectResturant, isPending: isRejecting } = useRejectResturent();
       const {mutate: approveResturaunt, isPending: isPendingApprove,}=useApproveResturent()

       const handleBlockUser = () => {
        rejectResturant(row.original._id,{
          onSuccess: () => {
            console.log("Restaurant Rejected successfully");
            alert("User Rejected successfully")
          },
          onError: (error:any) => {
            console.error("Error blocking user:", error);
          },
        });
        };

        const handleApprovedResturent = () => {
          approveResturaunt(row.original._id, {
            onSuccess: () => {            
              alert("Restaurant approved successfully")
            },
            onError: (error:any) => {
                alert("Somthing went wrong")
              console.error("Error unblocking user:", error);
            },
          });
        };

        return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <EditResturentModal restaurant={row.original} />
            {
                row.original.isApproved === "pending" && 
               <>
                <DropdownMenuItem onClick={handleApprovedResturent} disabled={isPendingApprove}>  Apporve {isPendingApprove && "ing..."}</DropdownMenuItem>
                
                <DropdownMenuItem className="text-red-600" onClick={handleBlockUser} disabled={isRejecting}>  Reject{isRejecting && "ing..."}  </DropdownMenuItem>
               </>
            }
        
        </DropdownMenuContent>
      </DropdownMenu>
    )
     }
  }
]