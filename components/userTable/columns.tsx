"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { ArrowUpDown, Edit2, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useBlockUser, useUnblockUser } from "@/hooks/useDataOverview"
import { useState } from "react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UserColumn = {
  _id: string
  name: string
  status: "active" | "blocked" | "success" | "failed"
  email: string
  role: "user" | "vendor" | "admin",
  address?: string,
  restaurants?: {
    _id: string
    name: string
    userId: string
  }[]
}

// Edit User Modal Component
const EditUserModal = ({ user }: { user: UserColumn }) => {
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status
  })

  const handleSave = () => {
    // Add your update user logic here
    console.log("Saving user data:", editData)
    // You can call your update user API here
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
         
          Edit
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={editData.name}
              onChange={(e) => setEditData({...editData, name: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={editData.email}
              onChange={(e) => setEditData({...editData, email: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Select value={editData.role} onValueChange={(value) => setEditData({...editData, role: value as "user" | "vendor" | "admin"})}>
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="vendor">Vendor</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select value={editData.status} onValueChange={(value) => setEditData({...editData, status: value as "active" | "blocked" | "success" | "failed"})}>
              <SelectTrigger className="col-span-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "name",
    header: () => <div className="font-bold text-zinc-800 pl-0">Name</div>,
  },
   {
    accessorKey: "email",
    header: () => <div className="font-bold text-zinc-800 pl-0">Email</div>,
  },
    {
  accessorKey: "role",
  enableSorting: true,
 sortingFn: (rowA, rowB, columnId) => {
  const order = { admin: 0, vendor: 1, user: 2 }

  const a = String(rowA.getValue(columnId)).toLowerCase() as keyof typeof order
  const b = String(rowB.getValue(columnId)).toLowerCase() as keyof typeof order

  if (!(a in order) || !(b in order)) {
    console.warn("Unexpected role value:", a, b)
  }

  return (order[a] ?? 99) - (order[b] ?? 99)
},
  header: ({ column }) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="font-bold text-zinc-800 pl-0"
    >
      Role
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  ),
  cell: ({ row }) => {
    const role: string = row.getValue("role")
    const roleClass =
      role === "user" ? "bg-green-500" :
      role === "vendor" ? "bg-yellow-500" :
      "bg-red-500"

    return (
      <div className="flex items-center gap-x-2">
        <div className={`rounded-full px-2 ${roleClass}`}>
          <span className="text-white">{role}</span>
        </div>
      </div>
    )
  }
},
{
  accessorKey: "restaurants",
  header: () => <div className="font-bold text-zinc-800 pl-0">Business Name</div>,
  cell: ({ row }) => {
    const restaurants = row.getValue("restaurants") as { name: string }[] || [];

    return (
      <div className="flex flex-col">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant, index) => (
            <span key={index} className="text-sm text-gray-600">
              {restaurant.name}
            </span>
          ))
        ) : (
          <span className="text-sm text-gray-400">No Business</span>
        )}
      </div>
    );
  }
},
  {
    accessorKey: "address",
    header: () => <div className="font-bold text-zinc-800 pl-0">Address</div>,
    cell: ({ row }) => {
      const address: string = row.getValue("address") || "No Address Provided";
      return <span className="text-sm text-gray-600">{address}</span>;
    }
  },
  {
    accessorKey: "status",
     enableSorting: true, // ✅ enable sorting
   header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-bold text-zinc-800 pl-0"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status : string = row.getValue("status")
      const statusClass = status === "active" ? "bg-green-500" : "bg-red-500"
      return (
        <div className="flex items-center gap-x-2">
          <div className={`h-2 w-2 rounded-full ${statusClass}`} />
          <span className="capitalize">{status}</span>
        </div>
      )
    }
  },
 

  
  {
    accessorKey: "_id",
    header: () => <div className="font-bold text-zinc-800 pl-0">Action</div>,
     cell:({row})=>    {

       const { mutate: blockUser, isPending } = useBlockUser();
       const {mutate: unblockUser, isPending: isPendingUnblock,}=useUnblockUser()

       const handleBlockUser = () => {
        blockUser(row.original._id,{
          onSuccess: () => {
            console.log("User blocked successfully");
            alert("User blocked successfully")
          },
          onError: (error:any) => {
            console.error("Error blocking user:", error);
          },
        });
        };

        const handleUnblockUser = () => {
          unblockUser(row.original._id, {
            onSuccess: () => {
              console.log("User unblocked successfully");
              alert("User unblocked successfully")
            },
            onError: (error:any) => {
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
            {/* <EditUserModal user={row.original} /> */}
            {
                row.original.status === "blocked" ?
                <DropdownMenuItem onClick={handleUnblockUser} disabled={isPendingUnblock}>  Unblock {isPendingUnblock && "ing..."}</DropdownMenuItem>
                :
                <DropdownMenuItem onClick={handleBlockUser} disabled={isPending}>  Block{isPending && "ing..."}  </DropdownMenuItem>
            }
        
        </DropdownMenuContent>
      </DropdownMenu>
    )
     }
  }

]