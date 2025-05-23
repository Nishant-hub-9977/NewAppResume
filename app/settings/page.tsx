"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, User, Bell, Shield, Palette, Mail, Globe, Lock } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-lg p-4 flex items-center gap-3">
        <div className="bg-primary/10 p-2 rounded-lg">
          <Settings className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your account preferences and settings</p>
        </div>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <TabsTrigger value="profile" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2 data-[state=active]:bg-chart-1 data-[state=active]:text-primary-foreground">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2 data-[state=active]:bg-chart-2 data-[state=active]:text-primary-foreground">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2 data-[state=active]:bg-chart-3 data-[state=active]:text-primary-foreground">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid gap-6">
            <Card className="border-l-4 border-l-primary">
              <CardHeader className="bg-primary/5">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Profile Settings
                </CardTitle>
                <CardDescription>
                  Manage your account settings and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <h3 className="font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4 text-chart-1" />
                      Contact Information
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Update your email and contact preferences.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium flex items-center gap-2">
                      <Globe className="h-4 w-4 text-chart-2" />
                      Language & Region
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Choose your preferred language and regional settings.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="border-l-4 border-l-chart-1">
            <CardHeader className="bg-chart-1/5">
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-chart-1" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose what notifications you want to receive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4 text-chart-3" />
                    Email Notifications
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Configure your email notification settings.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="border-l-4 border-l-chart-2">
            <CardHeader className="bg-chart-2/5">
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-chart-2" />
                Appearance Settings
              </CardTitle>
              <CardDescription>
                Customize how ResumeShortlister looks for you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Palette className="h-4 w-4 text-chart-4" />
                    Theme Preferences
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Choose between light, dark, or system theme.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="border-l-4 border-l-chart-3">
            <CardHeader className="bg-chart-3/5">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-chart-3" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage your account security and privacy.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Lock className="h-4 w-4 text-chart-5" />
                    Password & Authentication
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Update your password and security preferences.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}