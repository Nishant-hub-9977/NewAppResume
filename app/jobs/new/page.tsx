import MainLayout from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import JobForm from "@/components/job/job-form";

export default function NewJobPage() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Job</h1>
          <p className="text-muted-foreground">
            Define a new job position and its requirements
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>
              Enter job information and required skills for candidate matching
            </CardDescription>
          </CardHeader>
          <CardContent>
            <JobForm />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}