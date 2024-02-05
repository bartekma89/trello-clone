"use client";

import { useEffect, useState } from "react";

import { ListWithCard } from "@/types";
import { ListForm } from "./list-form";
import { ListItem } from "./list-item";

interface ListContainerProps {
  data: ListWithCard[];
  boardId: string;
}

export const ListContainer = ({ data }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  return (
    <ol className="flex gap-x-3 h-full">
      {orderedData.map((data, index) => {
        return <ListItem data={data} key={data.id} index={index} />;
      })}

      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};
