"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { ArrowUpDown, Blocks, Edit2, Link, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useBlockUser, useUnblockUser } from "@/hooks/useDataOverview"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UserColumn = {
  _id: string
  name: number
  status: "active" | "blocked" | "success" | "failed"
  email: string
  role: "user" | "vendor" | "admin"
}

export const columns: ColumnDef<UserColumn>[] = [
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
    accessorKey: "name",
    header: () => <div className="font-bold text-zinc-800 pl-0">Name</div>,
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