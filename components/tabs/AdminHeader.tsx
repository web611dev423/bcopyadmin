'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Moon, Settings2, SettingsIcon, Sun, User } from 'lucide-react';
// import { useTheme } from 'next-themes';
import { NotificationBell } from '../custom/notification-bell';

interface AdminHeaderProps {
  changeTab: (lang: string) => void;
  openSetting: () => void;
}

export function AdminHeader({ changeTab, openSetting }: AdminHeaderProps) {
  // const { setTheme } = useTheme();
  const handleClick = () => {
    openSetting();
  }
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <NotificationBell changeTab={changeTab} />
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
            <Button variant="ghost" size="icon" onClick={handleClick}>
              <SettingsIcon className="h-[1.2rem] w-[1.2rem]" />
            </Button>
            {/* <Button variant="ghost" size="icon">
              <User className="h-[1.2rem] w-[1.2rem]" />
            </Button> */}
          </div>
        </div>
      </div>
    </header>
  );
}