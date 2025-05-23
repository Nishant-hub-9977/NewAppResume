"use client";

import { FileText } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function RecentUploads() {
  // This would be fetched from the API in a production app
  const uploads = [
    {
      id: "1",
      name: "John Doe",
      file: "john-doe-resume.pdf",
      uploadDate: "2 hours ago",
      status: "Processed",
      skillMatch: 85,
    },
    {
      id: "2",
      name: "Jane Smith",
      file: "jane-smith-cv.docx",
      uploadDate: "5 hours ago",
      status: "Processed",
      skillMatch: 72,
    },
    {
      id: "3",
      name: "Alex Johnson",
      file: "alex-johnson-resume.pdf",
      uploadDate: "Yesterday",
      status: "Processing",
      skillMatch: null,
    },
    {
      id: "4",
      name: "Sarah Williams",
      file: "sarah-williams-cv.pdf",
      uploadDate: "Yesterday",
      status: "Processed",
      skillMatch: 90,
    },
    {
      id: "5",
      name: "Michael Brown",
      file: "michael-brown-resume.docx",
      uploadDate: "2 days ago",
      status: "Failed",
      skillMatch: null,
    },
  ];

  return (
    <div className="space-y-4">
      {uploads.map((upload) => (
        <div key={upload.id} className="flex items-center gap-4">
          <Avatar className="h-10 w-10 border">
            <AvatarFallback className="bg-primary/10 text-primary">
              {upload.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-medium">{upload.name}</p>
              <Badge 
                variant={
                  upload.status === "Processed" ? "default" : 
                  upload.status === "Processing" ? "outline" : "destructive"
                }
              >
                {upload.status}
              </Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <FileText className="mr-1 h-3 w-3" />
              {upload.file}
              <span className="ml-auto">{upload.uploadDate}</span>
            </div>
            {upload.skillMatch !== null && (
              <div className="pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span>Skill Match</span>
                  <span className="font-medium">{upload.skillMatch}%</span>
                </div>
                <Progress 
                  value={upload.skillMatch} 
                  className="h-1.5 mt-1"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}