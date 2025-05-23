"use client";

import { Calendar, Mail, MapPin, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from "recharts";

interface CandidateProfileProps {
  resume: any;
}

export default function CandidateProfile({ resume }: CandidateProfileProps) {
  // This would be calculated based on job requirements in a real app
  const skillScores = [
    { name: "React", score: 90 },
    { name: "TypeScript", score: 85 },
    { name: "Node.js", score: 75 },
    { name: "GraphQL", score: 80 },
    { name: "JavaScript", score: 95 },
  ];

  const matchData = [
    { name: "Skills", value: 85, color: "hsl(var(--chart-1))" },
    { name: "Experience", value: 90, color: "hsl(var(--chart-2))" },
    { name: "Education", value: 80, color: "hsl(var(--chart-3))" },
  ];

  const totalScore = matchData.reduce((acc, item) => acc + item.value, 0) / matchData.length;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{resume.summary}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {resume.experience.map((exp: any, index: number) => (
                <div key={index} className="border-l-2 border-muted pl-4 pb-2">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h3 className="font-medium">{exp.title}</h3>
                    <span className="text-sm text-muted-foreground">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {exp.company}, {exp.location}
                  </div>
                  <p className="text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resume.education.map((edu: any, index: number) => (
                <div key={index} className="border-l-2 border-muted pl-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h3 className="font-medium">{edu.degree}</h3>
                    <span className="text-sm text-muted-foreground">
                      Graduated: {edu.graduationDate}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {edu.school}, {edu.location}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{resume.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{resume.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{resume.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-6">
              {resume.skills.map((skill: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="space-y-4">
              {skillScores.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{skill.name}</span>
                    <span className="font-medium">{skill.score}%</span>
                  </div>
                  <Progress value={skill.score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Match Score</CardTitle>
            <CardDescription>Based on job requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center text-center mb-4">
              <div className="h-36 w-36 rounded-full bg-muted flex items-center justify-center mb-2">
                <span className="text-4xl font-bold">{Math.round(totalScore)}%</span>
              </div>
              <p className="text-sm text-muted-foreground">Overall Match</p>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={matchData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {matchData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}