import React from 'react';
import { MapPin, User, Tent, } from 'lucide-react';
import Link from 'next/link';

export type Ticket = {
  _id: string;
  subject: string;
  description: string;
  status: 'open' | 'closed' | 'pending'; // Add other statuses as needed
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};

function SupportCard({data}:{data:any}) {
  return (
    <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-lg p-4 text-white">
      {/* Header with status and avatars */}
      <div className="flex items-center justify-between mb-4">
        <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
          {data.user.email}
        </span>
        {/* <div className="flex -space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 border-2 border-gray-900 flex items-center justify-center"
            >
              <div className="w-3 h-3 rounded-full bg-white/20"></div>
            </div>
          ))}
        </div> */}
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold mb-4">Subject: {data.subject}</h2>

      {/* Details */}
      <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
        <div className="flex items-center gap-1">
          <Tent className="w-full" />
          <span>Description:{data.description}</span>
        </div>
        {/* <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>London, Great Britain</span>
        </div>
        <div className="flex items-center gap-1">
          <User className="w-4 h-4" />
          <span>Alex Johnson</span>
        </div> */}
      </div>

      {/* Progress Section */}
      <div className="border-t border-gray-800 pt-4">
        <div className="flex items-center justify-between text-sm">
          {/* <span className="text-gray-300 font-medium">Pre-Production (2/4)</span> */}
          <Link href={`mailto:${data.user.email}`} className="p-2 rounded-md bg-green-600 text-white">
  Reply to email
</Link>
        </div>
      </div>
    </div>
  )
}

export default SupportCard