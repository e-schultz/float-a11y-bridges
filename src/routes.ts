
/**
 * Centralized route definitions for the application
 * 
 * This file defines all application routes in one place to ensure
 * consistency across the application and make route changes easier.
 */

/**
 * Application route definitions
 */
export const routes = {
  home: "/",
  schemas: "/schemas",
  entry: (entryId: string) => `/entry/${entryId}`,
  thread: (threadName: string) => `/thread/${encodeURIComponent(threadName)}`,
};

/**
 * Type definitions for breadcrumb items
 */
export interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

/**
 * Helper function to create breadcrumb navigation items
 * 
 * @param currentPath - Current active path
 * @returns Array of breadcrumb items for the path
 */
export const generateBreadcrumbs = (currentPath: string): BreadcrumbItem[] => {
  const items: BreadcrumbItem[] = [
    { label: "Home", path: routes.home }
  ];
  
  // Schema explorer page
  if (currentPath === routes.schemas) {
    items.push({ label: "Schema Explorer", path: routes.schemas, isActive: true });
  }
  
  // Entry detail page
  else if (currentPath.startsWith("/entry/")) {
    const entryId = currentPath.split("/").pop() || "";
    items.push(
      { label: "Entries", path: routes.home },
      { label: `Entry ${entryId}`, path: currentPath, isActive: true }
    );
  }
  
  // Thread filter page
  else if (currentPath.startsWith("/thread/")) {
    const threadName = decodeURIComponent(currentPath.split("/").pop() || "");
    items.push(
      { label: "Threads", path: routes.home },
      { label: threadName, path: currentPath, isActive: true }
    );
  }
  
  return items;
};

