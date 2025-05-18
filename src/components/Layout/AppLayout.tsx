
import React from 'react';
import { LogEntry } from "@/types/LogEntry";
import ThreadsSidebar from "@/components/ThreadsSidebar";
import AppHeader from "@/components/Navigation/AppHeader";
import Breadcrumb from "@/components/Navigation/Breadcrumb";
import { BreadcrumbItem } from "@/routes";

/**
 * AppLayout provides consistent layout structure for all pages
 * with header, sidebar, and main content area
 */
interface AppLayoutProps {
  children: React.ReactNode;
  breadcrumbs: BreadcrumbItem[];
  entries: LogEntry[];
  selectedEntry: LogEntry | null;
  onEntrySelect: (entry: LogEntry) => void;
  threads: string[];
  onThreadSelect: (thread: string | null) => void;
  activeFilter: string | null;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  clearFilter: () => void;
  pageTitle?: string;
  pageSubtitle?: string;
}

const AppLayout = ({
  children,
  breadcrumbs,
  entries,
  selectedEntry,
  onEntrySelect,
  threads,
  onThreadSelect,
  activeFilter,
  sidebarOpen,
  toggleSidebar,
  clearFilter,
  pageTitle,
  pageSubtitle
}: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 flex flex-col">
      <AppHeader 
        toggleSidebar={toggleSidebar}
        activeFilter={activeFilter}
        clearFilter={clearFilter}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <ThreadsSidebar 
          isOpen={sidebarOpen} 
          entries={entries} 
          selectedEntry={selectedEntry}
          onEntrySelect={onEntrySelect}
          threads={threads}
          onThreadSelect={onThreadSelect}
          activeFilter={activeFilter}
        />
        
        <main className="flex-1 overflow-auto p-4">
          <Breadcrumb items={breadcrumbs} />
          
          {(pageTitle || pageSubtitle) && (
            <div className="mb-4">
              {pageTitle && <h2 className="text-xl font-semibold">{pageTitle}</h2>}
              {pageSubtitle && <p className="text-gray-400 text-sm">{pageSubtitle}</p>}
            </div>
          )}
          
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
