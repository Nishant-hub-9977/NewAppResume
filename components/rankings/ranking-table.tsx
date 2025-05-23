"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpDown, Eye, FileText, MoreHorizontal } from "lucide-react";
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

interface RankingTableProps {
  jobId: string;
}

export default function RankingTable({ jobId }: RankingTableProps) {
  // This would be fetched from the API in a production app
  const candidates = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      experience: "5 years",
      skillMatch: 85,
      educationMatch: 80,
      experienceMatch: 90,
      overallScore: 85,
      skills: ["React", "TypeScript", "Node.js", "GraphQL"],
    },
    {
      id: "4",
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      experience: "4 years",
      skillMatch: 90,
      educationMatch: 95,
      experienceMatch: 85,
      overallScore: 90,
      skills: ["React", "TypeScript", "Next.js", "TailwindCSS"],
    },
    {
      id: "6",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      experience: "6 years",
      skillMatch: 78,
      educationMatch: 70,
      experienceMatch: 95,
      overallScore: 81,
      skills: ["React", "JavaScript", "CSS", "HTML"],
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      experience: "3 years",
      skillMatch: 72,
      educationMatch: 85,
      experienceMatch: 65,
      overallScore: 74,
      skills: ["Angular", "TypeScript", "SCSS"],
    },
    {
      id: "7",
      name: "David Wilson",
      email: "david.wilson@example.com",
      experience: "3 years",
      skillMatch: 64,
      educationMatch: 75,
      experienceMatch: 60,
      overallScore: 66,
      skills: ["Vue.js", "JavaScript", "CSS"],
    },
  ];

  const [sortField, setSortField] = useState<string>("overallScore");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedCandidates = [...candidates].sort((a, b) => {
    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];
    
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
            <TableHead>Skills</TableHead>
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
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("overallScore")}
                className="flex items-center gap-1 px-0 hover:bg-transparent"
              >
                Overall Score
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCandidates.map((candidate) => (
            <TableRow key={candidate.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div>{candidate.name}</div>
                    <div className="text-sm text-muted-foreground">{candidate.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{candidate.experience}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {candidate.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="w-[100px]">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span>{candidate.skillMatch}%</span>
                  </div>
                  <Progress 
                    value={candidate.skillMatch} 
                    className="h-1.5"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="w-[100px]">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span>{candidate.overallScore}%</span>
                  </div>
                  <Progress 
                    value={candidate.overallScore} 
                    className={`h-1.5 ${
                      candidate.overallScore >= 80 ? "bg-green-500" : 
                      candidate.overallScore >= 70 ? "bg-blue-500" : 
                      "bg-orange-500"
                    }`}
                  />
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
                      <Link href={`/resumes/${candidate.id}`} className="flex items-center w-full">
                        <Eye className="mr-2 h-4 w-4" />
                        View Profile
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