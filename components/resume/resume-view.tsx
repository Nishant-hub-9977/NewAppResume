"use client";

import { Download, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ResumeViewProps {
  resume: any;
}

export default function ResumeView({ resume }: ResumeViewProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Resume Document</CardTitle>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Download Original
        </Button>
      </CardHeader>
      <CardContent>
        <div className="bg-muted rounded-lg p-10 min-h-[600px] flex flex-col items-center justify-center">
          <FileText className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">Resume Preview</h3>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            Document preview is not available. Please download the original resume to view it.
          </p>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Download Resume
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}