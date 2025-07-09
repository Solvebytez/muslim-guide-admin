'use client'

import { useGetPendingTable, useGetRejectedTable } from '@/hooks/useResturent'
import React from 'react'

import { DataTable } from './data-table'
import { columns } from './column'

function RejectedTable() {
    const {data, isLoading, isError} = useGetRejectedTable()
  
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>
  
    console.log("RejectedTable", data)

  return (
   <div className="mx-auto pb-10">
         <h2 className='text-2xl font-bold mb-4'>Restaurants ({data.allRejectedResturent.length})</h2>
         <DataTable columns={columns} data={data.allRejectedResturent} />
       </div>
  )
}

export default RejectedTable