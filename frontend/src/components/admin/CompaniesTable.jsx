import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { PopoverTrigger } from '@radix-ui/react-popover'

function CompaniesTable() {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate()
    useEffect(() => {
        const filteredCompanies = companies?.filter((company) => {
            return company.name.toLowerCase().includes(searchCompanyByText.toLowerCase())
        })
        console.log(searchCompanyByText);
        
        setFilterCompany(filteredCompanies);
    }, [companies, searchCompanyByText])
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.length <= 0 ? <span>You haven't registered any company yet.</span> :
                        filterCompany?.map((company) =>
                            (
                                <>
                                    <TableRow>
                                        <TableCell>
                                            <Avatar>
                                                <AvatarImage src={company.logo}/>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>{company.name}</TableCell>
                                        <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                        <TableCell className='text-right cusror-pointer'>
                                            <Popover>
                                                <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                                <PopoverContent className="w-32">
                                                    <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 cursor-pointer w-fit'>
                                                        <Edit2 className='w-4' />
                                                        <span>Edit</span>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                </>
                            ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable