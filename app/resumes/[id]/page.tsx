import MainLayout from "@/components/layout/main-layout";
import CandidateProfile from "@/components/resume/candidate-profile";
import ResumeView from "@/components/resume/resume-view";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, FileText, Share } from "lucide-react";

interface ResumeDetailPageProps {
  params: {
    id: string;
  };
}

export default function ResumeDetailPage({ params }: ResumeDetailPageProps) {
  const { id } = params;

  // This would be fetched from the API in a production app
  const resume = {
    id,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    skills: [
      "React", 
      "TypeScript", 
      "Node.js", 
      "GraphQL",
      "Redux",
      "JavaScript",
      "HTML/CSS",
      "Git",
      "Jest",
      "CI/CD"
    ],
    experience: [
      {
        title: "Senior Frontend Developer",
        company: "Tech Solutions Inc.",
        location: "San Francisco, CA",
        startDate: "Jan 2021",
        endDate: "Present",
        description: "Led the development of a complex SPA using React, TypeScript, and GraphQL. Implemented state management with Redux and improved performance by 40%."
      },
      {
        title: "Frontend Developer",
        company: "Web Innovations",
        location: "Seattle, WA",
        startDate: "Mar 2018",
        endDate: "Dec 2020",
        description: "Developed responsive web applications using React and JavaScript. Worked closely with UX designers to implement pixel-perfect interfaces."
      },
      {
        title: "Junior Developer",
        company: "Creative Digital",
        location: "Portland, OR",
        startDate: "Jun 2016",
        endDate: "Feb 2018",
        description: "Built and maintained websites for various clients using JavaScript, HTML, and CSS."
      }
    ],
    education: [
      {
        degree: "B.S. Computer Science",
        school: "University of Washington",
        location: "Seattle, WA",
        graduationDate: "2016"
      }
    ],
    summary: "Senior Frontend Developer with 7+ years of experience building modern web applications. Specialized in React, TypeScript, and state management solutions. Passionate about creating responsive, accessible, and performant user interfaces.",
    fileUrl: "#",
    uploadDate: "2023-04-12T10:30:00Z"
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{resume.name}</h1>
            <p className="text-muted-foreground">
              {resume.email} • {resume.location}
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" className="gap-2">
              <Share className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full max-w-[400px] mb-6">
            <TabsTrigger value="profile" className="flex-1 gap-2">
              <FileText className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="resume" className="flex-1 gap-2">
              <FileText className="h-4 w-4" />
              Resume
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <CandidateProfile resume={resume} />
          </TabsContent>
          <TabsContent value="resume">
            <ResumeView resume={resume} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}