
# Changelog

All notable changes to the FLOAT Continuity System will be documented in this file.

## [Unreleased]

### Added
- Created dedicated types directory with LogEntry type definition
- Added data directory with sample entries moved from components
- Implemented useLogEntries custom hook for centralized data management
- Added proper type safety throughout the application
- Created smaller, focused components for LogViewer (LogHeader, LogContent, LogFooter)
- Added reusable components for ThreadsSidebar (EntryItem, ThreadItem)
- Improved component composition following single responsibility principle
- Created new custom hooks (useLogTabs, useSidebarState) for improved state management
- Added JSDoc comments to hooks for better documentation

### Changed
- Refactored Index.tsx to use the new hook-based data management
- Updated LogViewer and ThreadsSidebar components to use proper typing
- Improved code organization with better separation of concerns
- Enhanced state management with custom hook implementation
- Restructured components to follow better composition patterns
- Refactored LogContent to use useLogTabs hook for tab state management
- Updated ThreadsSidebar to use useSidebarState hook for UI state

### Fixed
- Removed data management logic from page components
- Eliminated prop drilling with centralized state management
- Improved component structure with better type safety
- Added missing import for formatDate in LogContent component

## [0.1.0] - Initial Version

### Added
- Core application structure with React, TailwindCSS and UI components
- LogViewer component with tabbed interface
- ThreadsSidebar for thread management
- Schema-driven UI system with renderer and editor
- Navigation between log entries
- Toast notifications for user feedback
