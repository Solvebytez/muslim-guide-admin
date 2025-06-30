'use client'
import React from 'react'
import { DataTable } from './data-table'
import { columns,  } from './columns'
import { useGetAllUsers } from '@/hooks/useDataOverview'



export default function Activeusertable() {

  const {data, isLoading, isError} = useGetAllUsers()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  console.log("users", data)


  return (
    <div className="mx-auto pb-10">
      <h2 className='text-2xl font-bold mb-4'>Users ({data.users.length})</h2>
      <DataTable columns={columns} data={data.users} />
    </div>
  )
}
