import MainLayout from "@/components/layout/main-layout";
import RankingTable from "@/components/rankings/ranking-table";
import RankingChart from "@/components/rankings/ranking-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Download, Share, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RankingsPageProps {
  params: {
    jobId: string;
  };
}

export default function RankingsPage({ params }: RankingsPageProps) {
  const { jobId } = params;

  // This would be fetched from the API in a production app
  const job = {
    id: jobId,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote",
    postedDate: "April 10, 2023",
    candidates: 38,
    shortlisted: 12,
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{job.title}</h1>
            <p className="text-muted-foreground">
              {job.department} • {job.location} • Posted on {job.postedDate}
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" className="gap-2">
              <Share className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Candidates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                <div className="text-2xl font-bold">{job.candidates}</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Shortlisted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                <div className="text-2xl font-bold">{job.shortlisted}</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Average Match Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BarChart className="mr-2 h-5 w-5 text-muted-foreground" />
                <div className="text-2xl font-bold">76%</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Candidate Rankings</CardTitle>
            <CardDescription>
              Candidates ranked by skill match for this position
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="table" className="w-full">
              <TabsList className="w-full max-w-[400px] mb-6">
                <TabsTrigger value="table" className="flex-1">Table View</TabsTrigger>
                <TabsTrigger value="chart" className="flex-1">Chart View</TabsTrigger>
              </TabsList>
              <TabsContent value="table">
                <RankingTable jobId={jobId} />
              </TabsContent>
              <TabsContent value="chart">
                <RankingChart jobId={jobId} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}