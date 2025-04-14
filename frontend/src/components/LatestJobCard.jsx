import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

function LatestJobCard({key, job}) {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/description/${job._id}`)} className='p-4 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
        <div>
            <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
            <p className='text-sm text-gray-500'>India</p>
        </div>
        <div>
            <h1 className='text-lg font-bold my-2'>{job?.title}</h1>
            <p className='text-sm text-gray-600'>{job?.description}</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className="text-blue-700 font-bold" variant="ghost">{job?.position} Positions</Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">{job?.jobType}</Badge>
            <Badge className="text-[#6A38C2] font-bold" variant="ghost">{job?.salary} LPA</Badge>
        </div>
    </div>
  )
}

export default LatestJobCard