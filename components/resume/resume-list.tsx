"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpDown, ChevronDown, Eye, FileText, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ResumeList() {
  // This would be fetched from the API in a production app
  const resumes = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      file: "john-doe-resume.pdf",
      uploadDate: "2023-04-12T10:30:00Z",
      status: "Processed",
      skillMatch: 85,
      experience: "5 years",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      file: "jane-smith-cv.docx",
      uploadDate: "2023-04-11T14:45:00Z",
      status: "Processed",
      skillMatch: 72,
      experience: "3 years",
    },
    {
      id: "3",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      file: "alex-johnson-resume.pdf",
      uploadDate: "2023-04-10T09:15:00Z",
      status: "Processing",
      skillMatch: null,
      experience: "7 years",
    },
    {
      id: "4",
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      file: "sarah-williams-cv.pdf",
      uploadDate: "2023-04-09T16:20:00Z",
      status: "Processed",
      skillMatch: 90,
      experience: "4 years",
    },
    {
      id: "5",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      file: "michael-brown-resume.docx",
      uploadDate: "2023-04-08T11:50:00Z",
      status: "Failed",
      skillMatch: null,
      experience: "2 years",
    },
    {
      id: "6",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      file: "emily-davis-resume.pdf",
      uploadDate: "2023-04-07T13:25:00Z",
      status: "Processed",
      skillMatch: 78,
      experience: "6 years",
    },
    {
      id: "7",
      name: "David Wilson",
      email: "david.wilson@example.com",
      file: "david-wilson-cv.pdf",
      uploadDate: "2023-04-06T15:10:00Z",
      status: "Processed",
      skillMatch: 64,
      experience: "3 years",
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

  const sortedResumes = [...resumes].sort((a, b) => {
    if (!sortField) return 0;
    
    let aValue = a[sortField as keyof typeof a];
    let bValue = b[sortField as keyof typeof b];
    
    if (sortField === "uploadDate") {
      aValue = new Date(aValue as string).getTime();
      bValue = new Date(bValue as string).getTime();
    }
    
    if (aValue === null) return 1;
    if (bValue === null) return -1;
    
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
                onClick={() => handleSort("name")}
                className="flex items-center gap-1 px-0 hover:bg-transparent"
              >
                Candidate
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("experience")}
                className="flex items-center gap-1 px-0 hover:bg-transparent"
              >
                Experience
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("uploadDate")}
                className="flex items-center gap-1 px-0 hover:bg-transparent"
              >
                Upload Date
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("skillMatch")}
                className="flex items-center gap-1 px-0 hover:bg-transparent"
              >
                Skill Match
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedResumes.map((resume) => (
            <TableRow key={resume.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div>{resume.name}</div>
                    <div className="text-sm text-muted-foreground">{resume.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{resume.experience}</TableCell>
              <TableCell>{formatDate(resume.uploadDate)}</TableCell>
              <TableCell>
                <Badge 
                  variant={
                    resume.status === "Processed" ? "default" : 
                    resume.status === "Processing" ? "outline" : "destructive"
                  }
                >
                  {resume.status}
                </Badge>
              </TableCell>
              <TableCell>
                {resume.skillMatch !== null ? (
                  <div className="w-[100px]">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>{resume.skillMatch}%</span>
                    </div>
                    <Progress 
                      value={resume.skillMatch} 
                      className="h-1.5"
                    />
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">N/A</span>
                )}
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
                      <Link href={`/resumes/${resume.id}`} className="flex items-center">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      Download Resume
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