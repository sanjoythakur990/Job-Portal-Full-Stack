import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

function AppliedJobTable() {
    const { allAppliedJobs } = useSelector(store => store.job);
    console.log(allAppliedJobs);
    
  return (
    <div className='my-5'>
        <Table>
            <TableCaption>A list of your applied jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className='text-right'>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {allAppliedJobs?.length <= 0 ? <span>You haven't applied in any jobs yet.</span> : allAppliedJobs?.map((appliedJob ,index) => (
                    <TableRow key={index}>
                        <TableCell>{appliedJob.createdAt.split("T")[0]}</TableCell>
                        <TableCell>{appliedJob.job?.title}</TableCell>
                        <TableCell>{appliedJob.job?.company.name}</TableCell>
                        <TableCell className='text-right'><Badge className={`capitalize ${appliedJob.status === "rejected" ? 'bg-red-400' : appliedJob.status === "pending" ? 'bg-gray-400' : 'bg-green-400'}`}>{appliedJob.status}</Badge></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  )
}

export default AppliedJobTable