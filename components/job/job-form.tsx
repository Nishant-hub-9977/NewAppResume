"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export default function JobForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [weights, setWeights] = useState({
    skills: 50,
    experience: 30,
    education: 20,
  });

  const handleAddSkill = () => {
    if (newSkill.trim() !== "" && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Mock API call - would be a real API call in production
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Job created successfully",
        description: "Your new job posting has been created.",
      });
      
      router.push("/jobs");
    } catch (error) {
      toast({
        title: "Error creating job",
        description: "There was a problem creating your job posting.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWeightChange = (type: keyof typeof weights, value: number[]) => {
    const newWeights = { ...weights, [type]: value[0] };
    
    // Ensure weights sum to 100%
    const otherTypes = Object.keys(weights).filter(t => t !== type) as Array<keyof typeof weights>;
    const remaining = 100 - newWeights[type];
    const ratio = weights[otherTypes[0]] / (weights[otherTypes[0]] + weights[otherTypes[1]]);
    
    newWeights[otherTypes[0]] = Math.round(remaining * ratio);
    newWeights[otherTypes[1]] = remaining - newWeights[otherTypes[0]];
    
    setWeights(newWeights);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label htmlFor="job-title">Job Title</Label>
          <Input
            id="job-title"
            placeholder="e.g. Senior Frontend Developer"
            required
          />
        </div>
        <div>
          <Label htmlFor="department">Department</Label>
          <Select required>
            <SelectTrigger id="department">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="product">Product</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="hr">Human Resources</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="e.g. San Francisco, CA or Remote"
            required
          />
        </div>
        <div>
          <Label htmlFor="employment-type">Employment Type</Label>
          <Select required>
            <SelectTrigger id="employment-type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
              <SelectItem value="freelance">Freelance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="job-description">Job Description</Label>
        <Textarea
          id="job-description"
          placeholder="Enter the full job description including requirements..."
          className="min-h-[200px]"
          required
        />
      </div>

      <div>
        <Label>Required Skills</Label>
        <div className="flex items-center space-x-2 mb-2">
          <Input
            placeholder="Add a skill (e.g. React)"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddSkill();
              }
            }}
          />
          <Button 
            type="button" 
            variant="outline" 
            size="icon" 
            onClick={handleAddSkill}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm"
            >
              {skill}
              <button
                type="button"
                className="ml-1 rounded-full hover:bg-background p-1"
                onClick={() => handleRemoveSkill(skill)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {skill}</span>
              </button>
            </div>
          ))}
        </div>
        {skills.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No skills added yet. Add skills to better match candidates.
          </p>
        )}
      </div>

      <div>
        <Label>Matching Criteria Weights</Label>
        <p className="text-sm text-muted-foreground mb-4">
          Adjust how different factors are weighted when matching candidates
        </p>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="skills-weight">Skills</Label>
              <span className="text-sm">{weights.skills}%</span>
            </div>
            <Slider
              id="skills-weight"
              value={[weights.skills]}
              min={10}
              max={80}
              step={5}
              onValueChange={(value) => handleWeightChange("skills", value)}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="experience-weight">Experience</Label>
              <span className="text-sm">{weights.experience}%</span>
            </div>
            <Slider
              id="experience-weight"
              value={[weights.experience]}
              min={10}
              max={70}
              step={5}
              onValueChange={(value) => handleWeightChange("experience", value)}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="education-weight">Education</Label>
              <span className="text-sm">{weights.education}%</span>
            </div>
            <Slider
              id="education-weight"
              value={[weights.education]}
              min={10}
              max={60}
              step={5}
              onValueChange={(value) => handleWeightChange("education", value)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          type="button" 
          variant="outline" 
          className="mr-2"
          onClick={() => router.push("/jobs")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Job"}
        </Button>
      </div>
    </form>
  );
}