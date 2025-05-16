
# Changelog

All notable changes to the FLOAT Continuity System will be documented in this file.

## [Unreleased]

### Added
- Created dedicated types directory with LogEntry type definition
- Added data directory with sample entries moved from components
- Implemented useLogEntries custom hook for centralized data management
- Added proper type safety throughout the application

### Changed
- Refactored Index.tsx to use the new hook-based data management
- Updated LogViewer and ThreadsSidebar components to use proper typing
- Improved code organization with better separation of concerns
- Enhanced state management with custom hook implementation

### Fixed
- Removed data management logic from page components
- Eliminated prop drilling with centralized state management
- Improved component structure with better type safety

## [0.1.0] - Initial Version

### Added
- Core application structure with React, TailwindCSS and UI components
- LogViewer component with tabbed interface
- ThreadsSidebar for thread management
- Schema-driven UI system with renderer and editor
- Navigation between log entries
- Toast notifications for user feedback
