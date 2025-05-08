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
import { ArrowUpDown, Globe, Mail, User, Linkedin, MapPin, CheckCircle2, XCircle, PinOff, Pin } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchContributors, pinContributor, unPinContributor } from '@/store/reducers/contributorSlice';

export function UserProfiles() {
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.contributors);

  useEffect(() => {
    dispatch(fetchContributors());
  }, [dispatch]);


  const handlePin = async (id: string) => {
    await dispatch(pinContributor({ id }));
  }
  const handleUnPin = async (id: string) => {
    await dispatch(unPinContributor({ id }));
  }
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
            <TableHead>PinRank</TableHead>
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
                <div className="space-y-1">
                  <div className="text-sm">Total Contributions:{user.contributions.length}</div>
                </div>
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
              <TableCell className="text-right flex items-center space-x-2">
                <p className="text-sm">{user.featureRank ? user.featureRank : ""}</p>
                <Button variant="ghost" size="icon" className={user.isFeatured ? "text-blue" : "text-red"} onClick={() => { !user.isFeatured ? handlePin(user._id) : handleUnPin(user._id) }}>
                  {user.isFeatured ? <PinOff className="h-4 w-4" fill='red' /> : <Pin className="h-4 w-4" fill='blue' />}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}