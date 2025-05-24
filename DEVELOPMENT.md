# Development Guide

## Getting Started

### Prerequisites

- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher (comes with Node.js)
- **Git**: For version control
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

### Initial Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd float-continuity-system
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:5173`

## Development Workflow

### Daily Development

1. **Pull Latest Changes**
   ```bash
   git pull origin main
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Make Changes and Test**
   - Edit files in your preferred editor
   - See changes live in the browser
   - Test functionality manually

5. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

6. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking

# Testing
npm test             # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report

# Utilities
npm run clean        # Clean build artifacts
npm run analyze      # Analyze bundle size
```

## Code Organization

### Component Structure

Every component should follow this structure:

```typescript
// ComponentName.tsx
import React from 'react';
import { ComponentProps } from './types'; // Local types if needed

/**
 * ComponentName - Brief description of what this component does
 * 
 * @param prop1 - Description of prop1
 * @param prop2 - Description of prop2
 */
interface ComponentNameProps {
  prop1: string;
  prop2?: number;
  children?: React.ReactNode;
}

const ComponentName = ({ prop1, prop2, children }: ComponentNameProps) => {
  // Component logic here
  
  return (
    <div className="component-classes">
      {/* JSX here */}
    </div>
  );
};

export default ComponentName;
```

### Hook Structure

Custom hooks should follow this pattern:

```typescript
// useHookName.ts
import { useState, useEffect } from 'react';

/**
 * useHookName - Brief description of hook functionality
 * 
 * @param initialValue - Description of parameter
 * @returns Object with state and actions
 */
export const useHookName = (initialValue?: any) => {
  const [state, setState] = useState(initialValue);
  
  // Hook logic here
  
  return {
    state,
    actions: {
      updateState: setState,
      // Other actions
    }
  };
};
```

### Type Definitions

Keep types organized and well-documented:

```typescript
// types/ComponentTypes.ts

/**
 * Core data structure for log entries
 */
export interface LogEntry {
  id: string;
  title: string;
  timestamp: string;
  description: string;
  contextMarkers: string[];
  mode: string;
  activeThreads: string[];
  content?: string;
  type: "bridge" | "thread" | "concept" | "note";
}

/**
 * Props interface for components that handle log entries
 */
export interface LogEntryProps {
  entry: LogEntry;
  onSelect?: (entry: LogEntry) => void;
  isSelected?: boolean;
}
```

## Coding Standards

### TypeScript

1. **Always use TypeScript** for new files
2. **Define interfaces** for all props and complex objects
3. **Use strict type checking** - avoid `any` type
4. **Document complex types** with JSDoc comments

```typescript
// Good
interface UserData {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
}

// Avoid
const userData: any = { /* ... */ };
```

### React Best Practices

1. **Functional Components**: Use function components with hooks
2. **Props Destructuring**: Destructure props in function signature
3. **Default Props**: Use default parameters instead of defaultProps
4. **Event Handlers**: Use descriptive names with `handle` prefix

```typescript
// Good
const Button = ({ 
  children, 
  onClick, 
  variant = "default" 
}: ButtonProps) => {
  const handleClick = () => {
    // Handle click logic
    onClick?.();
  };

  return (
    <button onClick={handleClick} className={`btn-${variant}`}>
      {children}
    </button>
  );
};
```

### CSS and Styling

1. **Tailwind CSS**: Use Tailwind utilities for styling
2. **Responsive Design**: Mobile-first approach
3. **Dark Theme**: Maintain dark theme consistency
4. **Semantic Classes**: Use semantic class names when needed

```typescript
// Good
<div className="bg-gray-900 border border-gray-800 rounded-lg p-4 md:p-6">
  <h2 className="text-xl font-semibold text-gray-200">Title</h2>
</div>
```

### File Naming

- **Components**: PascalCase (`LogViewer.tsx`)
- **Hooks**: camelCase with `use` prefix (`useLogEntries.ts`)
- **Types**: PascalCase (`LogEntry.ts`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)

## State Management

### Local State

Use `useState` for component-local state:

```typescript
const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState({ name: '', email: '' });
```

### Custom Hooks

Extract reusable state logic into custom hooks:

```typescript
const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  
  return { value, toggle, setTrue, setFalse };
};
```

### React Query

Use React Query for server state:

```typescript
const useLogEntries = () => {
  return useQuery({
    queryKey: ['logEntries'],
    queryFn: fetchLogEntries,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

## Testing Strategy

### Unit Tests

Test individual functions and components:

```typescript
// utils/formatDate.test.ts
import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2023-01-01T12:00:00Z');
    expect(formatDate(date)).toBe('Jan 1, 2023');
  });
});
```

### Component Tests

Test component behavior:

```typescript
// components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('should call onClick when clicked', () => {
    const mockClick = jest.fn();
    render(<Button onClick={mockClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Tests

Test component interactions:

```typescript
// pages/Index.test.tsx
import { render, screen } from '@testing-library/react';
import Index from './Index';

describe('Index Page', () => {
  it('should render log entries', () => {
    render(<Index />);
    expect(screen.getByText('Log Entries')).toBeInTheDocument();
  });
});
```

## Performance Guidelines

### React Performance

1. **Memoization**: Use `React.memo` for expensive components
2. **Callbacks**: Use `useCallback` for event handlers passed to children
3. **Values**: Use `useMemo` for expensive calculations
4. **State**: Keep state as local as possible

```typescript
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => 
    data.map(item => expensiveTransform(item)), 
    [data]
  );
  
  const handleUpdate = useCallback((id) => 
    onUpdate(id), 
    [onUpdate]
  );
  
  return <div>{/* component JSX */}</div>;
});
```

### Bundle Optimization

1. **Code Splitting**: Use `React.lazy` for page components
2. **Tree Shaking**: Import only what you need
3. **Dynamic Imports**: Load features on demand

```typescript
// Lazy load pages
const SchemaExplorer = React.lazy(() => import('./pages/SchemaExplorer'));

// Import specific utilities
import { formatDate } from '@/lib/utils';
```

## Error Handling

### Component Error Boundaries

```typescript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
```

### Async Error Handling

```typescript
const useAsyncOperation = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const execute = async (operation) => {
    try {
      setLoading(true);
      setError(null);
      await operation();
    } catch (err) {
      setError(err);
      console.error('Operation failed:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return { execute, error, loading };
};
```

## Debugging

### Development Tools

1. **React DevTools**: Install browser extension
2. **Console Logging**: Use descriptive console messages
3. **Debugger**: Use browser debugger with source maps
4. **Network Tab**: Monitor API calls

### Common Debug Patterns

```typescript
// Debug component renders
useEffect(() => {
  console.log('Component rendered with props:', props);
}, [props]);

// Debug state changes
useEffect(() => {
  console.log('State changed:', state);
}, [state]);

// Debug API calls
const fetchData = async () => {
  console.log('Fetching data...');
  try {
    const response = await api.getData();
    console.log('Data received:', response);
    return response;
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
};
```

## Git Workflow

### Commit Messages

Follow conventional commit format:

```
type(scope): description

feat(auth): add login functionality
fix(ui): resolve button alignment issue
docs(readme): update installation instructions
refactor(hooks): simplify useLogEntries logic
test(components): add Button component tests
```

### Branch Naming

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `refactor/component-name` - Code refactoring
- `docs/section-name` - Documentation updates

### Pull Request Process

1. Create feature branch from `main`
2. Make changes with descriptive commits
3. Update tests and documentation
4. Run linting and type checking
5. Create pull request with description
6. Address review feedback
7. Merge when approved

## Environment Setup

### VS Code Extensions

Recommended extensions:

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### VS Code Settings

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "typescript": "html"
  }
}
```

## Deployment

### Production Build

```bash
# Create optimized build
npm run build

# Test production build locally
npm run preview
```

### Environment Variables

Create `.env.local` for local development:

```bash
VITE_API_URL=http://localhost:3000/api
VITE_APP_VERSION=1.0.0
```

### Build Optimization

The build process automatically:
- Minifies JavaScript and CSS
- Optimizes images and assets
- Generates source maps
- Splits code for better caching

## Troubleshooting

### Common Issues

1. **TypeScript Errors**: Check type definitions and imports
2. **Build Failures**: Clear `node_modules` and reinstall
3. **Performance Issues**: Use React DevTools Profiler
4. **Styling Issues**: Check Tailwind class names and purging

### Debug Commands

```bash
# Clear all caches
npm run clean && rm -rf node_modules && npm install

# Check bundle size
npm run analyze

# Run type checking only
npm run type-check

# Verbose build output
npm run build -- --verbose
```

## Getting Help

### Resources

- **Documentation**: Check `README.md` and architecture docs
- **Code Examples**: Look at existing components for patterns
- **Type Definitions**: Reference TypeScript types in `src/types/`
- **UI Components**: Check Shadcn/ui documentation

### Support Channels

- Create GitHub issues for bugs
- Use discussions for questions
- Check existing issues before creating new ones
- Include reproduction steps and error messages
