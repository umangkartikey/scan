# Matrix Privacy Guardian - Terminal Interface

## Overview

Matrix Privacy Guardian is a cyberpunk-themed privacy monitoring application with a hardcore terminal aesthetic. The application simulates a digital footprint monitor with tracker detection capabilities, featuring Matrix-inspired visual effects and a command-line interface design.

## System Architecture

### Monorepo Structure
- **Frontend**: React 18 with TypeScript, styled with Tailwind CSS and shadcn/ui
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Build System**: Vite for frontend bundling, esbuild for server compilation
- **Development**: Full-stack development with hot module replacement

### Technology Stack
- **Frontend Framework**: React 18 with TypeScript
- **UI Library**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom Matrix-themed color scheme
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Backend Framework**: Express.js with TypeScript
- **Database Provider**: Neon Database (serverless PostgreSQL)

## Key Components

### Frontend Architecture
- **Matrix Theme**: Custom CSS variables and classes for green-on-black terminal aesthetic
- **Component Library**: Comprehensive shadcn/ui components with Matrix customization
- **Visual Effects**: Matrix rain animation, terminal boot sequences, ASCII art banners
- **Responsive Design**: Mobile-first approach with terminal-style breakpoints

### Backend Architecture
- **RESTful API**: Express.js with structured route handling
- **Database Integration**: PostgreSQL with Drizzle ORM for persistent storage
- **Database Schema**: Privacy scans, tracker detections, system status, and user tables
- **Middleware**: Request logging, error handling, and CORS support

### Database Design
The schema includes four main entities:
- **users**: User authentication and management
- **privacy_scans**: Privacy scan results with scores and risk levels
- **tracker_detections**: Individual tracker detection records
- **system_status**: System protection status flags

## Data Flow

1. **Privacy Scanning**: Simulated privacy scans generate mock data for URLs
2. **Tracker Detection**: Mock tracker detection with blocking status
3. **Real-time Updates**: Live data streams with Matrix-style visualization
4. **Terminal Interface**: Command-line style interactions for system control

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **@tanstack/react-query**: Server state management
- **drizzle-orm**: Type-safe database operations
- **express**: Backend server framework
- **react**: Frontend framework
- **tailwindcss**: Utility-first CSS framework

### UI Dependencies
- **@radix-ui/***: Headless UI components
- **class-variance-authority**: CSS class management
- **clsx**: Conditional CSS classes
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Frontend build tool with HMR
- **esbuild**: Server bundling
- **tsx**: TypeScript execution
- **@replit/vite-plugin-***: Replit-specific development tools

## Deployment Strategy

### Development Mode
- Frontend served via Vite dev server with HMR
- Backend runs with tsx for TypeScript execution
- Database migrations handled via Drizzle Kit
- Replit-specific plugins for enhanced development experience

### Production Build
- Frontend: Vite builds optimized bundle to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- Static files served by Express in production
- Database schema pushed via `drizzle-kit push`

### Environment Configuration
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Environment flag for development/production modes
- Path aliases configured for clean imports (`@/`, `@shared/`)

## Changelog

```
Changelog:
- June 29, 2025. Initial setup with Matrix-themed privacy dashboard
- June 29, 2025. Added database integration with PostgreSQL and Drizzle ORM
  - Created DatabaseStorage class replacing in-memory storage
  - Added database tables for users, privacy scans, tracker detections, system status
  - Implemented full CRUD operations with persistent data storage
  - Successfully tested API endpoints with database operations
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```