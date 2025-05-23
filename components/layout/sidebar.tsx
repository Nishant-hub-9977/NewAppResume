"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart, 
  FileText, 
  FolderPlus, 
  Home, 
  Settings, 
  UserPlus, 
  Users, 
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();

  const routes = [
    {
      name: "Dashboard",
      path: "/",
      icon: Home,
    },
    {
      name: "Resumes",
      path: "/resumes",
      icon: FileText,
    },
    {
      name: "Upload",
      path: "/upload",
      icon: FolderPlus,
    },
    {
      name: "Jobs",
      path: "/jobs",
      icon: Users,
    },
    {
      name: "Rankings",
      path: "/rankings",
      icon: BarChart,
    },
    {
      name: "Team",
      path: "/team",
      icon: UserPlus,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r bg-card transition-transform md:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <FileText className="h-6 w-6 text-primary" />
          <span className="text-xl">ResumeShortlister</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(false)}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close sidebar</span>
        </Button>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {routes.map((route) => (
            <li key={route.path}>
              <Link
                href={route.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === route.path
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
              >
                <route.icon className="h-5 w-5" />
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t p-4">
        <div className="rounded-lg bg-muted p-4">
          <h3 className="font-medium">Need help?</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Check our documentation or contact support.
          </p>
          <Button variant="default" size="sm" className="mt-3 w-full">
            View Docs
          </Button>
        </div>
      </div>
    </aside>
  );
}