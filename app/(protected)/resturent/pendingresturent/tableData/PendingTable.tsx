'use client'

import { useGetPendingTable } from '@/hooks/useResturent'
import React from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'

function PendingTable() {
    const {data, isLoading, isError} = useGetPendingTable()
  
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>
  
    console.log("PendingTable", data)

  return (
   <div className="mx-auto pb-10">
         <h2 className='text-2xl font-bold mb-4'>Restaurants ({data.allPendingResturent.length})</h2>
         <DataTable columns={columns} data={data.allPendingResturent} />
       </div>
  )
}

export default PendingTable