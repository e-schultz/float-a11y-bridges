
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { routes } from "@/routes";

/**
 * AppHeader component provides consistent header navigation
 * for all pages in the application.
 * 
 * @param toggleSidebar - Function to toggle sidebar visibility
 * @param activeFilter - Current active filter (if any)
 * @param clearFilter - Function to clear the active filter
 */
interface AppHeaderProps {
  toggleSidebar: () => void;
  activeFilter?: string | null;
  clearFilter?: () => void;
}

const AppHeader = ({ toggleSidebar, activeFilter, clearFilter }: AppHeaderProps) => {
  return (
    <header className="border-b border-gray-800 p-4 flex items-center justify-between bg-gray-950">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden mr-2" 
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center">
          <Link to={routes.home} className="text-pink-500 font-bold text-xl mr-2">FLOAT</Link>
          <span className="text-gray-400 text-sm">Continuity System</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {activeFilter && clearFilter && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearFilter}
            className="text-xs"
          >
            Clear Filter: {activeFilter}
          </Button>
        )}
        
        <Link to={routes.schemas}>
          <Button variant="outline" size="sm" className="text-xs">
            Schema Explorer
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default AppHeader;
