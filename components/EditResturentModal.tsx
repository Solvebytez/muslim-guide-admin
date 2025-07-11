"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { DropdownMenuItem } from "./ui/dropdown-menu"
import { Edit2 } from "lucide-react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"
import { Restaurant } from "@/app/(protected)/resturent/approvedresturent/tableData/column"
import axiosInstance from "@/lib/axiosInstance"
import { splitOutsideParentheses } from "@/lib/utils"

const EditResturentModal = ({ restaurant }: { restaurant: Restaurant }) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [editData, setEditData] = useState({
    name: restaurant.name,
    address: restaurant.address,
    contactName: restaurant.contactName,
    contactEmail: restaurant.contactEmail,
    cuisine: restaurant.cuisine.join(", "),   
    suppliers: restaurant.suppliers.join(", "),
    phoneNumber: restaurant.phoneNumber
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Name validation
    if (!editData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (editData.name.length > 100) {
      newErrors.name = "Name must be less than 100 characters"
    }

    // Address validation
    if (!editData.address.trim()) {
      newErrors.address = "Address is required"
    } else if (editData.address.length > 200) {
      newErrors.address = "Address must be less than 200 characters"
    }

    // Contact Name validation
    if (!editData.contactName.trim()) {
      newErrors.contactName = "Contact name is required"
    } else if (editData.contactName.length > 50) {
      newErrors.contactName = "Contact name must be less than 50 characters"
    }

    // Contact Email validation
    if (!editData.contactEmail.trim()) {
      newErrors.contactEmail = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editData.contactEmail)) {
      newErrors.contactEmail = "Invalid email format"
    } else if (editData.contactEmail.length > 100) {
      newErrors.contactEmail = "Email must be less than 100 characters"
    }

    // Cuisine validation
    if (!editData.cuisine.trim()) {
      newErrors.cuisine = "At least one cuisine is required"
    } else {
      const cuisineItems = editData.cuisine.split(",").map(item => item.trim())
      if (cuisineItems.some(item => !item)) {
        newErrors.cuisine = "Empty cuisine items are not allowed"
      } else if (cuisineItems.some(item => item.length > 100)) {
        newErrors.cuisine = "Each cuisine item must be less than 30 characters"
      }
    }

    // Suppliers validation
    if (editData.suppliers.trim()) {
      const supplierItems = editData.suppliers.split(",").map(item => item.trim())
      if (supplierItems.some(item => !item)) {
        newErrors.suppliers = "Empty supplier items are not allowed"
      } else if (supplierItems.some(item => item.length > 100)) {
        newErrors.suppliers = "Each supplier must be less than 50 characters"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

const handleSave = async () => {
  try {
    setIsLoading(true)

    if (!validateForm()) {
      setIsLoading(false)
      return
    }

    // Convert cuisine string back to array
    const updatedData = {
      ...editData,
      suppliers: editData.suppliers.split(",").map(item => item.trim()),
     cuisine: splitOutsideParentheses(editData.cuisine)
    }

    const response = await axiosInstance.put(`/update-resturent/${restaurant._id}`, updatedData)

    // Optional: You could check if response is successful explicitly
    if (response.status === 200) {
      // Successfully updated
      setOpen(false)
       window.location.reload() // ✅ Reload the page after successful update
    } else {
      alert("Something went wrong while saving.")
    }

  } catch (error: any) {
    console.error("Error saving restaurant:", error)
    alert(error?.response?.data?.message || "An error occurred while saving the restaurant.")
  } finally {
    setIsLoading(false)
  }
}


  const handleFieldChange = (field: string, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          {/* <Edit2 className="mr-2 h-4 w-4" /> */}
          Edit
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Restaurant</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Name Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <div className="col-span-3 flex flex-col gap-1">
              <Input
                id="name"
                value={editData.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
            </div>
          </div>

          {/* Address Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <div className="col-span-3 flex flex-col gap-1">
              <Input
                id="address"
                value={editData.address}
                onChange={(e) => handleFieldChange("address", e.target.value)}
                className={errors.address ? "border-red-500" : ""}
              />
              {errors.address && <span className="text-xs text-red-500">{errors.address}</span>}
            </div>
          </div>

          {/* Phone Number Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phoneNumber" className="text-right">
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              value={editData.phoneNumber || ""}
              onChange={(e) => setEditData({...editData, phoneNumber: e.target.value})}
              className="col-span-3"
            />
          </div>

          {/* Contact Name Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contactName" className="text-right">
              Contact Name
            </Label>
            <div className="col-span-3 flex flex-col gap-1">
              <Input
                id="contactName"
                value={editData.contactName}
                onChange={(e) => handleFieldChange("contactName", e.target.value)}
                className={errors.contactName ? "border-red-500" : ""}
              />
              {errors.contactName && <span className="text-xs text-red-500">{errors.contactName}</span>}
            </div>
          </div>

          {/* Contact Email Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contactEmail" className="text-right">
              Contact Email
            </Label>
            <div className="col-span-3 flex flex-col gap-1">
              <Input
                id="contactEmail"
                value={editData.contactEmail}
                onChange={(e) => handleFieldChange("contactEmail", e.target.value)}
                className={errors.contactEmail ? "border-red-500" : ""}
              />
              {errors.contactEmail && <span className="text-xs text-red-500">{errors.contactEmail}</span>}
            </div>
          </div>

          {/* Cuisine Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cuisine" className="text-right">
              Cuisine (comma separated)
            </Label>
            <div className="col-span-3 flex flex-col gap-1">
              <Input
                id="cuisine"
                value={editData.cuisine}
                onChange={(e) => handleFieldChange("cuisine", e.target.value)}
                className={errors.cuisine ? "border-red-500" : ""}
              />
              {errors.cuisine && <span className="text-xs text-red-500">{errors.cuisine}</span>}
            </div>
          </div>

          {/* Suppliers Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="suppliers" className="text-right">
              Suppliers (comma separated)
            </Label>
            <div className="col-span-3 flex flex-col gap-1">
              <Input
                id="suppliers"
                value={editData.suppliers}
                onChange={(e) => handleFieldChange("suppliers", e.target.value)}
                className={errors.suppliers ? "border-red-500" : ""}
              />
              {errors.suppliers && <span className="text-xs text-red-500">{errors.suppliers}</span>}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-green-700">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditResturentModal

