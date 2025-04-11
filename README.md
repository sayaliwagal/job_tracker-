# Student Job Tracker - Frontend

A modern React frontend for the Student Job Tracker application built with Vite, TypeScript, ShadCN UI, and Tailwind CSS.

## ✨ Features

- **Interactive Dashboard**: View your job application statistics at a glance
- **Application Management**: Add, view, edit, and delete job applications
- **Filtering & Sorting**: Filter applications by status, date, or company
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean and intuitive interface using ShadCN UI components

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development experience
- **TailwindCSS** for utility-first styling
- **ShadCN UI** for high-quality UI components
- **React Query** for data fetching and state management
- **React Router** for client-side routing
- **React Hook Form** for form validation
- **Zod** for schema validation
- **Axios** for API requests

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.x or higher)
- npm or yarn
- Backend API (see main project README)

### Installation

1. Clone the repository (if you haven't already):

```bash
git clone https://github.com/yourusername/student-job-tracker.git
cd student-job-tracker/frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the frontend directory:

```
VITE_API_URL=http://localhost:8000/api
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
frontend/
├── public/
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── assets/            # Static assets like images
│   ├── components/        # Reusable UI components
│   │   ├── ui/            # ShadCN UI components
│   │   ├── layout/        # Layout components
│   │   ├── jobs/          # Job-specific components
│   │   └── ...
│   ├── hooks/             # Custom React hooks
│   │   ├── useJobs.ts
│   │   ├── useFilters.ts
│   │   └── ...
│   ├── lib/               # Utility libraries and configurations
│   │   ├── api.ts         # API client setup
│   │   ├── utils.ts       # Helper functions
│   │   └── ...
│   ├── pages/             # Page components
│   │   ├── Dashboard.tsx
│   │   ├── JobsList.tsx
│   │   ├── AddJob.tsx
│   │   ├── EditJob.tsx
│   │   └── ...
│   ├── services/          # API service functions
│   │   └── jobService.ts
│   ├── types/             # TypeScript type definitions
│   │   └── job.types.ts
│   ├── App.tsx            # Main App component
│   ├── main.tsx           # Entry point
│   └── ...
├── .eslintrc.json
├── .prettierrc
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🧩 Key Components

### Core Components

- `JobCard`: Displays individual job application information
- `JobForm`: Reusable form for adding/editing job applications
- `StatusBadge`: Visual indicator for application status
- `FilterBar`: Component for filtering job applications
- `Dashboard`: Statistics and overview of applications

### Custom Hooks

- `useJobs`: Manages job application data fetching and mutations
- `useFilters`: Handles filter state and logic
- `useDebounce`: Optimizes search input performance

## 📡 API Integration

This frontend uses React Query for all API requests, providing:

- Automatic caching and background refetching
- Loading and error states management
- Optimistic updates for mutations

### Example API Calls:

```typescript
// Fetching jobs with React Query
const {
  data: jobs,
  isLoading,
  error,
} = useQuery({
  queryKey: ["jobs", filters],
  queryFn: () => jobService.getJobs(filters),
});

// Adding a new job
const addJobMutation = useMutation({
  mutationFn: (newJob: JobFormData) => jobService.createJob(newJob),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["jobs"] });
    toast.success("Job application added successfully!");
  },
});
```

## 🎨 Styling

This project uses Tailwind CSS for styling with the ShadCN UI component library.

- Consistent color theme using CSS variables
- Responsive design with Tailwind's responsive utilities
- Dark mode support
- Custom animations for interactive elements

## 🧪 Best Practices

- **Component Abstraction**: Reusable components with clear APIs
- **State Management**: React Query for server state, React hooks for local state
- **TypeScript**: Strong typing throughout the application
- **Performance Optimization**: Memoization, code splitting, and lazy loading
- **Accessibility**: ARIA attributes and keyboard navigation support
- **Error Boundaries**: Graceful error handling at the component level

## 📦 Building for Production

```bash
npm run build
# or
yarn build
```

This will generate a production-ready build in the `dist` directory.

## 🚢 Deployment

### Deploying to Vercel

1. Connect your GitHub repository to Vercel
2. Set up the following environment variables:
   - `VITE_API_URL`: Your backend API URL
3. Use the following settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

## 🔧 Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build locally
- `npm run lint`: Run ESLint
- `npm run type-check`: Check TypeScript types
