# MindEase - Private Mental Health Chat Application

## Overview

MindEase is a privacy-focused mental health chat application that provides users with a safe space to explore their thoughts and feelings through AI-powered conversations. The application emphasizes complete privacy by processing conversations entirely client-side, ensuring no personal data is stored or transmitted to servers. Built as a full-stack web application with a React frontend and Express backend, it features a modern UI with animated backgrounds, responsive design, and direct OpenAI API integration for therapeutic conversations.

## User Preferences

Preferred communication style: Simple, everyday language.

**Therapeutic Approach Requirements:**
- East African societal understandings and ways of communicating
- Specialization in trauma, relationship trauma, narcissistic abuse, childhood trauma, anxiety, men's loneliness and mental health
- Short, succinct responses that are not overwhelming or verbose
- Focus on 3 key things for users to work on or think about
- Allow users to slow down their brain and process gradually
- Never try to resolve everything at once

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing with support for Home, Resources, and FAQ pages
- **State Management**: TanStack Query for server state management and React hooks for local state
- **UI Components**: Radix UI primitives with custom shadcn/ui components for accessible, consistent design
- **Styling**: Tailwind CSS with custom CSS variables for theming and design system consistency
- **Animations**: Framer Motion for smooth page transitions and interactive elements
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript for API endpoints and static file serving
- **Development Setup**: Custom Vite integration for hot module replacement and development experience
- **API Structure**: RESTful endpoints with health check and placeholder routes for future expansion
- **Error Handling**: Centralized error middleware with proper HTTP status codes and JSON responses
- **Logging**: Custom request logging for API calls with response time tracking

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle migrations with schema-first approach
- **Development Storage**: In-memory storage implementation for rapid prototyping
- **User Management**: Basic user schema with username/password authentication structure
- **Connection**: Neon Database serverless PostgreSQL for production deployment

### Authentication and Authorization
- **Current State**: Basic user schema defined but authentication not yet implemented
- **Planned Approach**: Session-based authentication with PostgreSQL session store
- **Session Management**: connect-pg-simple for persistent session storage
- **Security**: Prepared for secure session handling and user state management

### External Dependencies
- **Smart AI Routing System**: Intelligent switching between Claude and DeepSeek APIs based on message content analysis
- **Claude API**: Anthropic's Claude 4.0 Sonnet for complex emotional processing, trauma work, and philosophical inquiries
- **DeepSeek API**: DeepSeek Chat for practical advice, CBT techniques, and structured therapeutic support
- **OpenAI API**: Fallback support for GPT-4o completions (legacy integration maintained)
- **Privacy Approach**: All AI API calls made client-side to avoid server-side data processing
- **Streaming Support**: Real-time message streaming for responsive chat experience across all AI models
- **API Key Management**: Multi-provider environment variable configuration with browser-safe implementation
- **Intelligent Decision Logic**: Content analysis determines optimal AI choice based on therapeutic indicators and message characteristics

### UI/UX Design Decisions
- **Design System**: Professional theme with purple primary color and green secondary accents
- **Responsive Design**: Mobile-first approach with dedicated mobile navigation components
- **Accessibility**: Radix UI primitives ensure keyboard navigation and screen reader support
- **Animation Strategy**: Subtle animations for enhanced user experience without overwhelming interface
- **Privacy Indicators**: Clear messaging about data privacy and zero-storage architecture

### Development and Build Process
- **Build Strategy**: Separate client and server builds with esbuild for production optimization
- **Development Experience**: Hot reload for both frontend and backend with integrated Vite setup
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Module System**: ES modules throughout the application for modern JavaScript practices