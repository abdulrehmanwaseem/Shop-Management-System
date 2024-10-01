import { ArrowDown, ArrowUp } from "lucide-react";
import React from "react";

interface CardDataStatsProps {
  title: string;
  total: string;
  arrow: boolean;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({ title, total }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className=" flex items-end justify-between">
        <div>
          <h4 className="flex items-center  text-title-md font-bold text-black dark:text-white">
            {total}
          </h4>
          <span className="text-sm font-semibold ">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;
