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
import { ArrowUpDown, Globe, Mail, User, Linkedin, MapPin, CheckCircle2, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchContributors } from '@/store/reducers/contributorSlice';

export function UserProfiles() {
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.contributors);

  useEffect(() => {
    dispatch(fetchContributors());
  }, [dispatch]);

  // Mock data - replace with actual data fetching
  // const users = [
  //   {
  //     id: 1,
  //     name: 'John Smith',
  //     email: 'john.smith@example.com',
  //     linkedIn: 'linkedin.com/in/johnsmith',
  //     location: 'United States',
  //     status: 'active',
  //     verified: true,
  //     contributions: {
  //       codeSubmissions: 15,
  //       approvedSubmissions: 12,
  //       rating: 4.8
  //     },
  //     joinDate: '2024-01-15',
  //     lastActive: '2024-03-20'
  //   },
  //   {
  //     id: 2,
  //     name: 'Emma Wilson',
  //     email: 'emma.wilson@example.com',
  //     linkedIn: 'linkedin.com/in/emmawilson',
  //     location: 'United Kingdom',
  //     status: 'pending',
  //     verified: false,
  //     contributions: {
  //       codeSubmissions: 8,
  //       approvedSubmissions: 6,
  //       rating: 4.5
  //     },
  //     joinDate: '2024-02-01',
  //     lastActive: '2024-03-19'
  //   }
  // ];

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
              <SortButton field="country">Country</SortButton>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>
              <SortButton field="contributions">Contributions</SortButton>
            </TableHead>
            <TableHead>
              <SortButton field="lastActive">Activity</SortButton>
            </TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                  {user.verified && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </TooltipTrigger>
                        <TooltipContent>Verified User</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Linkedin className="h-4 w-4" />
                    <a href={`https://${user.linkedIn}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
                      Profile
                    </a>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{user.country}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={user.isActive ? 'default' : 'secondary'}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center space-x-1 text-center">
                      <Globe className="h-4 w-4" />
                      <span>{user.createdAt}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Joined: {user.createdAt}</p>
                      <p>Last active: {user.updatedAt}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center space-x-1 text-center">
                      <Globe className="h-4 w-4" />
                      <span>{user.isActive ? 'Active' : 'Inactive'}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Joined: {user.createdAt}</p>
                      <p>Last active: {user.updatedAt}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}