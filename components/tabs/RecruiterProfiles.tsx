'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  ArrowUpDown,
  Building2,
  Mail,
  Phone,
  User,
  Linkedin,
  Globe,
  CheckCircle2,
  ImageIcon
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchRecruiters } from '@/store/reducers/recruiterSlice';
// import Image from 'next/image';

export function RecruiterProfiles() {
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.recruiters);

  useEffect(() => {
    dispatch(fetchRecruiters());
  }, [dispatch]);


  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortButton = ({ field, children }: { field: string, children: React.ReactNode }) => (
    <Button
      variant="ghost"
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1"
    >
      {children}
      <ArrowUpDown className="h-4 w-4 ml-1" />
    </Button>
  );

  return (
    <div className="space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <SortButton field="name">Name</SortButton>
            </TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>
              <SortButton field="company">Company</SortButton>
            </TableHead>
            <TableHead>
              <SortButton field="lastActive">Activity</SortButton>
            </TableHead>
            <TableHead>
              Created Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((recruiter: any) => (
            <TableRow key={recruiter._id}>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{recruiter.name}</span>
                  {recruiter.status === 'verified' && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </TooltipTrigger>
                        <TooltipContent>Verified Recruiter</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{recruiter.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">{recruiter.phoneNumber}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Linkedin className="h-4 w-4" />
                    <a href={`https://${recruiter.profileLink}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
                      Profile
                    </a>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4" />
                      <span>{recruiter.companyName}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="flex items-center space-x-2 mb-2">
                        {/* <Image src={recruiter.companyLogo} alt={recruiter.companyName} width={100} height={100} /> */}
                        <span>{recruiter.companyLogo}</span>
                      </div>
                      <p className="text-sm">{recruiter.companyWebSite}</p>
                      <p className="text-sm">{recruiter.positions}</p>
                      <a href={`https://${recruiter.companyWebSite}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
                        Visit Website
                      </a>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              {/* <TableCell>
                <Badge variant={recruiter.status === 'verified' ? 'default' : 'secondary'}>
                  {recruiter.status}
                </Badge>
              </TableCell> */}
              <TableCell>
                <div className="space-y-1">
                  <div className="text-sm">Active Jobs: {recruiter.positions}</div>
                  {/* <div className="text-sm">Total Hires: {recruiter.totalHires}</div> */}
                </div>
              </TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center space-x-1">
                      <Globe className="h-4 w-4" />
                      <span>{recruiter.updatedAt}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Joined: {recruiter.createdAt}</p>
                      <p>Last active: {recruiter.updatedAt}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell className="text-right">
                {/* <Button variant="ghost" size="sm">
                  {recruiter.status === 'pending' ? 'Verify' : 'Edit'}
                </Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}