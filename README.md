
# FLOAT Continuity System

A schema-driven UI system for healthcare continuity management, built with React, TypeScript, and modern web technologies.

## Overview

The FLOAT Continuity System is designed around the philosophy that "form fields are moments of care" - touchpoints where practitioners interact with patients through technology. The system emphasizes **integration over conquest** and follows a **"shacks not cathedrals"** approach, building modular, focused, and adaptable components.

## Core Features

### 🔍 Log Entry Viewer
- Dark-themed viewer for various log entries (bridges, threads, concepts)
- Tabbed navigation for content organization
- Thread-based filtering and navigation
- Previous/next entry navigation with keyboard shortcuts

### 🎛️ Schema-Driven UI System
- Dynamic UI generation based on JSON schemas
- Support for multiple field types (text, number, select, boolean, badges, etc.)
- Real-time schema editing and preview
- Pre-built schema examples for common use cases

### 🧭 Intelligent Navigation
- Breadcrumb navigation with proper hierarchy
- Direct entry access via URL parameters
- Thread-specific views and filtering
- Consistent routing patterns across the application

### 📱 Responsive Design
- Mobile-first approach with collapsible sidebar
- Touch-friendly interface elements
- Consistent design system with dark theme
- Accessible color contrast and keyboard navigation

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Modern web browser with ES6+ support

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Layout/          # Layout components (AppLayout, AppHeader)
│   ├── LogViewer/       # Log viewing components
│   ├── Navigation/      # Navigation components
│   ├── ThreadsSidebar/  # Sidebar components
│   └── ui/              # Shadcn/ui components
├── data/                # Sample data and mock entries
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries and schema examples
├── pages/               # Page components
├── types/               # TypeScript type definitions
└── routes.ts            # Centralized route definitions
```

## Key Concepts

### Form Fields as Moments of Care
Every form field in the system is designed as a cognitive interface - a moment where care can be delivered. This philosophy drives the schema-driven approach, allowing dynamic reconfiguration based on context.

### Integration vs. Conquest
The system supports existing workflows rather than forcing rigid processes. By separating schema (data/structure) from presentation (UI components), we enable flexible adaptation to different contexts.

### Shacks not Cathedrals
Components are built to be modular, focused, and adaptable. Each piece serves a specific purpose and can be easily modified or replaced without affecting the entire system.

## Schema-Driven UI

The system uses JSON schemas to define UI components dynamically:

```typescript
const patientFormSchema: UISchema = {
  id: "patient-form",
  title: "Patient Information",
  fields: [
    {
      id: "name",
      type: "text",
      label: "Full Name",
      required: true
    },
    {
      id: "age",
      type: "number",
      label: "Age"
    }
  ]
};
```

Supported field types:
- `text` - Text input fields
- `number` - Numeric input fields
- `select` - Dropdown selections
- `boolean` - Yes/No toggles
- `badge` - Display badges
- `heading` - Section headings
- `paragraph` - Text content
- `separator` - Visual separators

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: Shadcn/ui component library
- **State Management**: React hooks with custom state management
- **Routing**: React Router v6
- **Data Fetching**: TanStack Query (React Query)
- **Build Tool**: Vite
- **Icons**: Lucide React

## Development

### Code Organization
- Components follow single responsibility principle
- Custom hooks encapsulate complex state logic
- Types are centralized in dedicated files
- Consistent naming conventions throughout

### State Management
- Local component state for UI interactions
- Custom hooks for complex business logic
- Context providers for widely shared state
- React Query for server state management

### Styling
- Utility-first approach with Tailwind CSS
- Consistent color palette and spacing
- Dark theme with purple/pink accents
- Responsive design patterns

## API Integration

The system is designed to work with RESTful APIs and supports:
- Real-time data fetching with React Query
- Optimistic updates for better UX
- Error handling and retry logic
- Background data synchronization

## Testing

### Running Tests
```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Testing Strategy
- Unit tests for utility functions
- Component tests for UI interactions
- Integration tests for user workflows
- End-to-end tests for critical paths

## Deployment

### Using Lovable
The easiest way to deploy is through Lovable:
1. Open your project in Lovable
2. Click "Share" → "Publish"
3. Your app will be deployed automatically

### Manual Deployment
```bash
# Build the application
npm run build

# Deploy the dist/ folder to your hosting provider
```

## Contributing

### Development Workflow
1. Create feature branch from main
2. Make changes following coding standards
3. Add tests for new functionality
4. Update documentation as needed
5. Submit pull request for review

### Coding Standards
- Use TypeScript for all new code
- Follow React best practices
- Write descriptive commit messages
- Add JSDoc comments for complex functions

## Architecture

For detailed architectural information, see [ARCHITECTURE.md](./ARCHITECTURE.md)

## Schema Guide

For comprehensive schema documentation, see [SCHEMA_GUIDE.md](./SCHEMA_GUIDE.md)

## License

This project is proprietary software developed for healthcare continuity management.

## Support

For technical support or questions:
- Review the documentation in this repository
- Check the [implementation plan](./implementation.md)
- Refer to component-specific documentation in source files
