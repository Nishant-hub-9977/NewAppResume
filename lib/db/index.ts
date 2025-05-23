"use server";

import { promises as fs } from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data');

export interface Resume {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  skills: string[];
  experience: {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    degree: string;
    school: string;
    location: string;
    graduationDate: string;
  }[];
  summary: string;
  fileUrl: string;
  uploadDate: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  status: string;
  candidates: number;
  shortlisted: number;
  postedDate: string;
  deadline: string;
}

export async function getResumes(): Promise<Resume[]> {
  try {
    await fs.mkdir(DB_PATH, { recursive: true });
    const resumesData = await fs.readFile(path.join(DB_PATH, 'resumes.json'), 'utf-8');
    return JSON.parse(resumesData);
  } catch {
    return [];
  }
}

export async function getResumeById(id: string): Promise<Resume | null> {
  const resumes = await getResumes();
  return resumes.find(resume => resume.id === id) || null;
}

export async function createResume(resume: Omit<Resume, 'id'>): Promise<Resume> {
  const resumes = await getResumes();
  const newResume = {
    ...resume,
    id: Math.random().toString(36).substr(2, 9)
  };
  resumes.push(newResume);
  await fs.writeFile(path.join(DB_PATH, 'resumes.json'), JSON.stringify(resumes, null, 2));
  return newResume;
}

export async function getJobs(): Promise<Job[]> {
  try {
    await fs.mkdir(DB_PATH, { recursive: true });
    const jobsData = await fs.readFile(path.join(DB_PATH, 'jobs.json'), 'utf-8');
    return JSON.parse(jobsData);
  } catch {
    return [];
  }
}

export async function getJobById(id: string): Promise<Job | null> {
  const jobs = await getJobs();
  return jobs.find(job => job.id === id) || null;
}

export async function createJob(job: Omit<Job, 'id'>): Promise<Job> {
  const jobs = await getJobs();
  const newJob = {
    ...job,
    id: Math.random().toString(36).substr(2, 9)
  };
  jobs.push(newJob);
  await fs.writeFile(path.join(DB_PATH, 'jobs.json'), JSON.stringify(jobs, null, 2));
  return newJob;
}