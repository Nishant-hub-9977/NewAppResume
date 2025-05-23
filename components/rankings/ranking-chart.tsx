"use client";

import { 
  Bar, 
  BarChart as RechartsBarChart, 
  CartesianGrid, 
  Legend, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

interface RankingChartProps {
  jobId: string;
}

export default function RankingChart({ jobId }: RankingChartProps) {
  // This would be fetched from the API in a production app
  const data = [
    {
      name: "John Doe",
      skillMatch: 85,
      educationMatch: 80,
      experienceMatch: 90,
      overallScore: 85,
    },
    {
      name: "Sarah Williams",
      skillMatch: 90,
      educationMatch: 95,
      experienceMatch: 85,
      overallScore: 90,
    },
    {
      name: "Emily Davis",
      skillMatch: 78,
      educationMatch: 70,
      experienceMatch: 95,
      overallScore: 81,
    },
    {
      name: "Jane Smith",
      skillMatch: 72,
      educationMatch: 85,
      experienceMatch: 65,
      overallScore: 74,
    },
    {
      name: "David Wilson",
      skillMatch: 64,
      educationMatch: 75,
      experienceMatch: 60,
      overallScore: 66,
    },
  ];

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-medium">Candidate Comparison</h3>
        <p className="text-sm text-muted-foreground">
          Compare candidates across different matching criteria
        </p>
      </div>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              height={60} 
              tick={{fontSize: 12}}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="skillMatch" name="Skill Match" fill="hsl(var(--chart-1))" />
            <Bar dataKey="educationMatch" name="Education Match" fill="hsl(var(--chart-2))" />
            <Bar dataKey="experienceMatch" name="Experience Match" fill="hsl(var(--chart-3))" />
            <Bar dataKey="overallScore" name="Overall Score" fill="hsl(var(--chart-4))" />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}