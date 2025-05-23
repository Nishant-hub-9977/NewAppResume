"use client";

import { BarChart2 } from "lucide-react";

export default function RecentJobs() {
  // This would be fetched from the API in a production app
  const jobs = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      department: "Engineering",
      candidates: 38,
      shortlisted: 12,
      postedDate: "1 week ago",
    },
    {
      id: "2",
      title: "UX Designer",
      department: "Design",
      candidates: 24,
      shortlisted: 8,
      postedDate: "2 weeks ago",
    },
    {
      id: "3",
      title: "Product Manager",
      department: "Product",
      candidates: 19,
      shortlisted: 6,
      postedDate: "3 weeks ago",
    },
    {
      id: "4",
      title: "DevOps Engineer",
      department: "Engineering",
      candidates: 15,
      shortlisted: 5,
      postedDate: "3 weeks ago",
    },
  ];

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div key={job.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{job.title}</h4>
              <p className="text-sm text-muted-foreground">{job.department}</p>
            </div>
            <span className="text-xs text-muted-foreground">{job.postedDate}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs">
                <span>Candidates</span>
                <span className="font-medium">{job.candidates}</span>
              </div>
              <div className="mt-1 h-1.5 w-full rounded-full bg-secondary">
                <div 
                  className="h-1.5 rounded-full bg-chart-1" 
                  style={{ width: `${(job.shortlisted / job.candidates) * 100}%` }}
                ></div>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {job.shortlisted} shortlisted
              </div>
            </div>
            <BarChart2 className="h-10 w-10 text-muted-foreground" />
          </div>
        </div>
      ))}
    </div>
  );
}