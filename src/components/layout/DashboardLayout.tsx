
import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="min-h-screen bg-background">
          <Sidebar open={sidebarOpen} />
          
          <div className={cn(
            "flex flex-col min-h-screen transition-all duration-300",
            sidebarOpen ? "lg:ml-64" : "lg:ml-20"
          )}>
            <Navbar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
            <main className="flex-1 px-4 py-8 md:px-6">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default DashboardLayout;
