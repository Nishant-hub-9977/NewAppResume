import MainLayout from "@/components/layout/main-layout";
import JobList from "@/components/job/job-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, Search, Users } from "lucide-react";
import Link from "next/link";

export default function JobsPage() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Jobs</h1>
            <p className="text-muted-foreground">
              Manage job descriptions and view candidate matches
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/jobs/new">
              <Button className="gap-2">
                <Users className="h-4 w-4" />
                Create Job
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <CardTitle>All Jobs</CardTitle>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search jobs..."
                    className="w-full rounded-md border border-input pl-8 pr-3 py-2 text-sm"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <JobList />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}