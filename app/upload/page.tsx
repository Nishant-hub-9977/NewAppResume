import MainLayout from "@/components/layout/main-layout";
import UploadForm from "@/components/upload/upload-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function UploadPage() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upload</h1>
          <p className="text-muted-foreground">
            Add new resumes or job descriptions to the system
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload Files</CardTitle>
            <CardDescription>
              Upload resume files (PDF, DOCX) or job descriptions to parse and analyze.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="resume" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="resume">Resume Upload</TabsTrigger>
                <TabsTrigger value="job">Job Description</TabsTrigger>
              </TabsList>
              <TabsContent value="resume">
                <UploadForm type="resume" />
              </TabsContent>
              <TabsContent value="job">
                <UploadForm type="job" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}