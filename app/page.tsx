import Link from "next/link";
import { ArrowRight, FileText, Users } from "lucide-react";

import MainLayout from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardMetrics from "@/components/dashboard/dashboard-metrics";
import RecentUploads from "@/components/dashboard/recent-uploads";
import RecentJobs from "@/components/dashboard/recent-jobs";

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of your resume screening activities
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/upload">
              <Button className="gap-2">
                <FileText className="h-4 w-4" />
                Upload Resumes
              </Button>
            </Link>
            <Link href="/jobs/new">
              <Button variant="outline" className="gap-2">
                <Users className="h-4 w-4" />
                Create Job
              </Button>
            </Link>
          </div>
        </div>
        
        <DashboardMetrics />
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Resumes</CardTitle>
                <CardDescription>Latest resume uploads and their status</CardDescription>
              </div>
              <Link href="/resumes">
                <Button variant="ghost" size="sm" className="gap-1">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <RecentUploads />
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Jobs</CardTitle>
                <CardDescription>Recent job openings and candidates</CardDescription>
              </div>
              <Link href="/jobs">
                <Button variant="ghost" size="sm" className="gap-1">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <RecentJobs />
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}