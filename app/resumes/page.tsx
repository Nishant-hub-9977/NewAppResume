import MainLayout from "@/components/layout/main-layout";
import ResumeList from "@/components/resume/resume-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Filter, Search } from "lucide-react";
import Link from "next/link";

export default function ResumesPage() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Resumes</h1>
            <p className="text-muted-foreground">
              Manage and review all uploaded resumes
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/upload">
              <Button className="gap-2">
                <FileText className="h-4 w-4" />
                Upload Resumes
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <CardTitle>All Resumes</CardTitle>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search resumes..."
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
            <ResumeList />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}