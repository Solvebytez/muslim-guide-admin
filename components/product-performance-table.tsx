"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const performanceData = [
  {
    id: 1,
    assigned: {
      name: "Sunil Joshi",
      role: "Web Designer",
    },
    name: "Elite Admin",
    priority: "Low",
    budget: "$3.9k",
  },
  {
    id: 2,
    assigned: {
      name: "Andrew McDownland",
      role: "Project Manager",
    },
    name: "Real Homes WP Theme",
    priority: "Medium",
    budget: "$24.5k",
  },
  {
    id: 3,
    assigned: {
      name: "Christopher Jamil",
      role: "Project Manager",
    },
    name: "MedicalPro WP Theme",
    priority: "High",
    budget: "$12.8k",
  },
  {
    id: 4,
    assigned: {
      name: "Nirav Joshi",
      role: "Frontend Engineer",
    },
    name: "Hosting Press HTML",
    priority: "Critical",
    budget: "$2.4k",
  },
]

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "low":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100"
    case "medium":
      return "bg-cyan-100 text-cyan-800 hover:bg-cyan-100"
    case "high":
      return "bg-orange-100 text-orange-800 hover:bg-orange-100"
    case "critical":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}

export function ProductPerformanceTable() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Product Performance</h1>
        <Select defaultValue="march-2025">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="march-2025">March 2025</SelectItem>
            <SelectItem value="february-2025">February 2025</SelectItem>
            <SelectItem value="january-2025">January 2025</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="border-b">
              <TableHead className="font-semibold text-gray-900">Id</TableHead>
              <TableHead className="font-semibold text-gray-900">Assigned</TableHead>
              <TableHead className="font-semibold text-gray-900">Name</TableHead>
              <TableHead className="font-semibold text-gray-900">Priority</TableHead>
              <TableHead className="font-semibold text-gray-900 text-right">Budget</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {performanceData.map((item) => (
              <TableRow key={item.id} className="border-b last:border-b-0">
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium text-gray-900">{item.assigned.name}</div>
                    <div className="text-sm text-gray-500">{item.assigned.role}</div>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-gray-900">{item.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={`${getPriorityColor(item.priority)} font-medium`}>
                    {item.priority}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-semibold text-gray-900">{item.budget}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
