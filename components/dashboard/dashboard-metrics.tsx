"use client";

import { BarChart3, FileText, Users, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardMetrics() {
  // This would fetch real metrics from the API in a production app
  const metrics = [
    {
      title: "Total Resumes",
      value: "243",
      description: "12% from last month",
      icon: FileText,
      trend: "up",
    },
    {
      title: "Active Jobs",
      value: "14",
      description: "3 added this week",
      icon: Users,
      trend: "up",
    },
    {
      title: "Shortlisted",
      value: "68",
      description: "24 this month",
      icon: Check,
      trend: "up",
    },
    {
      title: "Avg. Match Score",
      value: "76%",
      description: "5% increase",
      icon: BarChart3,
      trend: "up",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className={`text-xs ${metric.trend === "up" ? "text-green-500" : "text-red-500"}`}>
              {metric.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}