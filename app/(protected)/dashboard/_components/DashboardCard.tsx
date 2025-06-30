"use client";

import React from "react";
import {
  Calendar,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  UserCheck,
  UserCog,
  Bed,
  BedDouble,
} from "lucide-react";
import useDataOverview from "@/hooks/useDataOverview";
import { formatLabel } from "@/utils/Common";
import Link from "next/link";

const colors = [
  { color: "text-blue-500", bg: "bg-blue-500/20" },

  { color: "text-red-500", bg: "bg-red-500/20" },
  { color: "text-green-500", bg: "bg-green-500/20" },
  { color: "text-yellow-500", bg: "bg-yellow-500/20" },
  { color: "text-purple-500", bg: "bg-purple-500/20" },
  { color: "text-pink-500", bg: "bg-pink-500/20" },
];

const userRouters = [
  { name: "Pending", href: "/activeuser" },
  { name: "Approved", href: "/activeuser" },
  { name: "Rejected", href: "/activeuser" },
];

const resturentRouters = [
  { name: "Pending", href: "/resturent/pendingresturent" },
  { name: "Approved", href: "/resturent/approvedresturent" },
  { name: "Rejected", href: "/resturent/rejectedresturent" },
];

const icons = [UserCheck, TrendingUp, UserCog]; // Not objects, just components
const Hotelicons = [Bed, BedDouble, Bed, BedDouble]; // Not objects, just components

export default function DashboardOverviewCards() {
  const { data, isLoading, isError } = useDataOverview();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  const result = [
    {
      group: "user",
      data: Object.entries((data as any).user).map(([key, value], index) => {
        const { color, bg } = colors[index % colors.length];
        const Icon = icons[index % icons.length];
        const link = userRouters[index % userRouters.length];
        return {
          label: formatLabel(key),
          value,
          statusColor: color,
          statusBg: bg,
          Icon,
          link,
        };
      }),
    },
    {
      group: "restaurant",
      data: Object.entries(data.resturents).map(([key, value], index) => {
        const { color, bg } = colors[index % colors.length];
        const Icon = Hotelicons[index % Hotelicons.length];
        const link = resturentRouters[index % resturentRouters.length];
        return {
          label: formatLabel(key),
          value,
          statusColor: color,
          statusBg: bg,
          Icon,
          link,
        };
      }),
    },
  ];

  console.log(result);

  return (
    <div className="bg-white min-h-screen">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-zinc-900" />
        <h1 className="text-zinc-900 text-lg font-semibold">Data Overview</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
        {result.length > 0 ? (
          result.map((item, index) => (
            <div key={index + new Date().getTime().toString()}>
              {/* Header with icon and status */}
              {item.group === "user" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {item.data.map((item, index) => (
                    <div
                      key={index + new Date().getTime().toString()}
                      className={`bg-gray-800 rounded-sm p-6 border border-gray-700 gap-3 flex flex-col w-full`}
                    >
                      <div
                        className={`px-2 py-4 rounded-lg text-xs font-medium flex items-center gap-3 justify-center ${item.statusBg}`}
                      >
                        <div className={`text-${item.statusColor}`}>
                          <item.Icon
                            className={`${item.statusColor}`}
                            size={30}
                          />
                        </div>
                        <h3 className="text-white font-semibold text-lg mb-1">
                          {item.label} {(item.value as number).toString()}
                        </h3>
                      </div>

                      {/* View Details button */}
                      <button className="flex items-center justify-between w-full text-gray-400 hover:text-white transition-colors group">
                        <Link href={item.link.href} className="text-sm">
                          View Details
                        </Link>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {item.data.map((item, index) => (
                    <div
                      key={index + new Date().getTime().toString()}
                      className="bg-gray-800 rounded-sm p-6 border border-gray-700 gap-3 flex flex-col"
                    >
                      <div
                        className={`px-2 py-4 rounded-lg text-xs font-medium flex items-center gap-3 justify-center ${item.statusBg}`}
                      >
                        <div className={`text-${item.statusColor}`}>
                          <item.Icon
                            className={`${item.statusColor}`}
                            size={30}
                          />
                        </div>
                        <h3 className="text-white font-semibold text-lg mb-1">
                          {item.label} {(item.value as number).toString()}
                        </h3>
                      </div>

                      {/* View Details button */}

                      {item.label !== "Total Hotels" && (
                        <button className="flex items-center justify-between w-full text-gray-400 hover:text-white transition-colors group">
                          <Link href={item.link.href} className="text-sm">
                            View Details
                          </Link>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-white font-semibold text-lg mb-1">No Data</h3>
          </div>
        )}
      </div>
    </div>
  );
}
