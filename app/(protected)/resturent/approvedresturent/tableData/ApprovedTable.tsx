'use client'

import { useGetApprovedTable, useGetPendingTable } from '@/hooks/useResturent'
import React from 'react'

import { DataTable } from './data-table'
import { columns } from './column'


function ApporveTable() {
    const {data, isLoading, isError} = useGetApprovedTable()
  
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error</div>
  
    console.log("allApprovedResturent", data)

  return (
   <div className="mx-auto pb-10">
         <h2 className='text-2xl font-bold mb-4'>Restaurants ({data.allApprovedResturent.length})</h2>
         <DataTable columns={columns} data={data.allApprovedResturent} />
       </div>
  )
}

export default ApporveTable