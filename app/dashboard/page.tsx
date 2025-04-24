'use client'
import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { UserProfiles } from "@/components/tabs/UserProfiles";
import { RecruiterProfiles } from "@/components/tabs/RecruiterProfiles";
import { CodeList } from "@/components/tabs/CodeList";
import { Contributions } from "@/components/tabs/Contributions";
import { AdminHeader } from "@/components/tabs/AdminHeader";
import { JobPostings } from "@/components/tabs/JobPostings";
import CodeDialog from "@/components/custom/code-dialog";
import SettingDialog from "@/components/custom/setting-dialog";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("code-list");
  const [open, setOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('');
  const handleOpenDialog = (code: string, name: string, language: string) => {
    setOpen(true);
    setCode(code);
    setName(name);
    setLanguage(language);
  }
  const handleOpenSettingDialog = () => {
    setSettingOpen(true);
  }
  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
  }
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader changeTab={setActiveTab} openSetting={handleOpenSettingDialog} />
      <main className="container mx-auto px-4 py-8">
        <Card className="p-6">
          <Tabs value={activeTab} onValueChange={handleActiveTab}>
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="code-list">Code List</TabsTrigger>
              <TabsTrigger value="contributions">Contributions</TabsTrigger>
              <TabsTrigger value="jobs">Job Postings</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="recruiters">Recruiters</TabsTrigger>
            </TabsList>
            <TabsContent value="code-list">
              <CodeList handleOpenDialog={handleOpenDialog} />
            </TabsContent>
            <TabsContent value="contributions">
              <Contributions handleOpenDialog={handleOpenDialog} />
            </TabsContent>
            <TabsContent value="jobs">
              <JobPostings />
            </TabsContent>
            <TabsContent value="users">
              <UserProfiles />
            </TabsContent>
            <TabsContent value="recruiters">
              <RecruiterProfiles />
            </TabsContent>
          </Tabs>
        </Card>
      </main>
      <CodeDialog open={open} onOpenChange={setOpen} title={name} code={code} language={language} />
      <SettingDialog open={settingOpen} onOpenChange={setSettingOpen} />
    </div>
  );
}
