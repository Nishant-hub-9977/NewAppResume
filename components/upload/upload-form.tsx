"use client";

import { useState } from "react";
import { FileText, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface UploadFormProps {
  type: "resume" | "job";
}

export default function UploadForm({ type }: UploadFormProps) {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList);
    
    // Filter for PDF and DOCX files if resume upload
    if (type === "resume") {
      const validFiles = newFiles.filter(file => {
        const ext = file.name.split('.').pop()?.toLowerCase();
        return ext === 'pdf' || ext === 'docx';
      });
      
      if (validFiles.length !== newFiles.length) {
        toast({
          title: "Invalid file type",
          description: "Only PDF and DOCX files are allowed.",
          variant: "destructive",
        });
      }
      
      setFiles(prev => [...prev, ...validFiles]);
    } else {
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Mock API call - would be a real API call in production
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: `${type === "resume" ? "Resumes" : "Job description"} uploaded successfully`,
        description: `${files.length} ${type === "resume" ? "resumes have" : "job description has"} been processed.`,
      });
      
      setFiles([]);
      setJobTitle("");
      setJobDescription("");
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your files.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      {type === "job" && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="job-title">Job Title</Label>
            <Input
              id="job-title"
              placeholder="e.g. Senior Frontend Developer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="job-description">Job Description</Label>
            <Textarea
              id="job-description"
              placeholder="Enter the full job description including requirements..."
              className="min-h-[200px]"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Attachments (Optional)</Label>
          </div>
        </div>
      )}
      
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          dragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <FileText className="mx-auto h-10 w-10 text-muted-foreground" />
        <h3 className="mt-2 text-lg font-medium">
          Drag and drop your {type === "resume" ? "resumes" : "files"} here
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {type === "resume" 
            ? "Support for PDF and DOCX files only" 
            : "Upload JD document or use the form above"}
        </p>
        <Button type="button" variant="outline" className="mt-4 relative overflow-hidden">
          <Input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleFileChange}
            multiple={type === "resume"}
            accept={type === "resume" ? ".pdf,.docx" : undefined}
          />
          Browse Files
        </Button>
      </div>

      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium">Selected Files</h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-muted rounded-md"
              >
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm truncate max-w-[250px]">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(0)} KB
                  </span>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <Button
          type="submit"
          className="gap-2"
          disabled={
            (type === "resume" && files.length === 0) ||
            (type === "job" && !jobTitle && !jobDescription && files.length === 0)
          }
        >
          {loading ? (
            <>Processing...</>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              {type === "resume" ? "Upload Resumes" : "Save Job Description"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}