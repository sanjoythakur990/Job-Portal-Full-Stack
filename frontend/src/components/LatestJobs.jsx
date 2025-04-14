import React from "react";
import LatestJobCard from "./LatestJobCard";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";

const jobs = [1, 2, 3, 4, 5, 6, 7, 8];
function LatestJobs() {
  const { allJobs } = useSelector(store => store.job) 
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
      </h1>
      {/* cards */}
      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs.lenght <= 0 ? <span>No Jobs found!</span> : allJobs.slice(0,6).map((job) => (
          <LatestJobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default LatestJobs;
