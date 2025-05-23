"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpDown, BarChart, Calendar, ChevronDown, Eye, MoreHorizontal, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function JobList() {
  // This would be fetched from the API in a production app
  const jobs = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      status: "Active",
      candidates: 38,
      shortlisted: 12,
      postedDate: "2023-04-10T09:15:00Z",
      deadline: "2023-05-10T09:15:00Z",
    },
    {
      id: "2",
      title: "UX Designer",
      department: "Design",
      location: "New York, NY",
      status: "Active",
      candidates: 24,
      shortlisted: 8,
      postedDate: "2023-04-05T14:30:00Z",
      deadline: "2023-05-05T14:30:00Z",
    },
    {
      id: "3",
      title: "Product Manager",
      department: "Product",
      location: "San Francisco, CA",
      status: "Active",
      candidates: 19,
      shortlisted: 6,
      postedDate: "2023-03-28T11:45:00Z",
      deadline: "2023-04-28T11:45:00Z",
    },
    {
      id: "4",
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      status: "Active",
      candidates: 15,
      shortlisted: 5,
      postedDate: "2023-03-25T10:00:00Z",
      deadline: "2023-04-25T10:00:00Z",
    },
    {
      id: "5",
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Chicago, IL",
      status: "Closed",
      candidates: 27,
      shortlisted: 9,
      postedDate: "2023-03-15T13:20:00Z",
      deadline: "2023-04-15T13:20:00Z",
    },
    {
      id: "6",
      title: "Backend Developer",
      department: "Engineering",
      location: "Austin, TX",
      status: "Active",
      candidates: 32,
      shortlisted: 10,
      postedDate: "2023-04-02T15:10:00Z",
      deadline: "2023-05-02T15:10:00Z",
    },
  ];

  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedJobs = [...jobs].sort((a, b) => {
    if (!sortField) return 0;
    
    let aValue = a[sortField as keyof typeof a];
    let bValue = b[sortField as keyof typeof b];
    
    if (sortField === "postedDate" || sortField === "deadline") {
      aValue = new Date(aValue as string).getTime();
      bValue = new Date(bValue as string).getTime();
    }
    
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">
              <Button
                variant="ghost"
                onClick={() => handleSort("title")}
                className="flex items-center gap-1 px-0 hover:bg-transparent"
              >
                Job Title
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("postedDate")}
                className="flex items-center gap-1 px-0 hover:bg-transparent"
              >
                Posted Date
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("candidates")}
                className="flex items-center gap-1 px-0 hover:bg-transparent"
              >
                Candidates
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedJobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell className="font-medium">
                <Link href={`/jobs/${job.id}`} className="hover:underline">
                  {job.title}
                </Link>
              </TableCell>
              <TableCell>{job.department}</TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell>{formatDate(job.postedDate)}</TableCell>
              <TableCell>
                <Badge 
                  variant={job.status === "Active" ? "success" : "secondary"}
                >
                  {job.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{job.candidates}</span>
                  <span className="text-muted-foreground">
                    ({job.shortlisted} shortlisted)
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href={`/jobs/${job.id}`} className="flex items-center w-full">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={`/rankings/${job.id}`} className="flex items-center w-full">
                        <BarChart className="mr-2 h-4 w-4" />
                        View Rankings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar className="mr-2 h-4 w-4" />
                      Extend Deadline
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}