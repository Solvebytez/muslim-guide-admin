"use client";

import { useGetSupports } from "@/hooks/useSupports";
import React from "react";
import SupportCard from "./SupportCard";

function SupportItems() {
  const { data, isLoading, isError } = useGetSupports();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  console.log("SupportItems", data);

  return (
    <>
      <div className="flex gap-4">
        {data.length > 0 ? (
          data.map((item: any, index: number) => (
            <SupportCard key={index} data={item} />
          ))
        ) : (
          <div>No tickets</div>
        )}
      </div>
    </>
  );
}

export default SupportItems;
