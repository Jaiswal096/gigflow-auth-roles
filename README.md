# GigX - Freelance Gig Marketplace Platform

A full-stack web platform connecting gig providers with gig seekers. Built with React, TypeScript, and Lovable Cloud (Supabase).

## Features

### For Gig Providers
- Create, edit, and delete gig listings
- Manage gig status (open/closed/completed)
- Personalized dashboard with gig management
- Real-time gig statistics

### For Gig Seekers
- Browse available gigs
- Search and filter by category
- View detailed gig information
- Responsive grid layout

### Authentication & Security
- Secure email/password authentication
- Role-based access control (Provider/Seeker)
- Row-level security policies
- Protected routes

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI**: shadcn-ui, Tailwind CSS
- **Backend**: Lovable Cloud (Supabase)
- **Database**: PostgreSQL with RLS
- **Authentication**: Supabase Auth
- **State Management**: React Query

## Project Structure

```
src/
├── components/
│   ├── gig/              # Gig-related components
│   ├── ui/               # shadcn-ui components
│   └── ProtectedRoute.tsx
├── contexts/
│   └── AuthContext.tsx   # Authentication state
├── pages/
│   ├── Auth.tsx          # Login/Signup
│   ├── Dashboard.tsx     # Role-based dashboard
│   ├── Landing.tsx       # Public homepage
│   ├── provider/         # Provider features
│   └── seeker/           # Seeker features
└── integrations/
    └── supabase/         # Supabase client & types
```

## Database Schema

### Tables
- **profiles**: User profile information
- **user_roles**: Role assignments (gig_seeker/gig_provider)
- **gigs**: Gig listings with category, budget, location

### Security
- Row-Level Security (RLS) enabled on all tables
- Role-based access using `has_role()` function
- Secure authentication flow

## Project info

**URL**: https://lovable.dev/projects/51a4b5a3-1d12-4008-8133-82a13416c4ce

## How can I edit this code?

There are several ways of editing your application.



Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?



## Environment Variables

Environment variables are automatically managed by Lovable Cloud:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

## Deployment

Click the **Publish** button in Lovable to deploy your app:
- Frontend changes require clicking "Update" in the publish dialog
- Backend changes (database, edge functions) deploy automatically

## Custom Domain

To connect a custom domain:
1. Navigate to Project > Settings > Domains
2. Click Connect Domain
3. Follow the setup instructions


## GitHub Integration

Connect to GitHub via the GitHub button in the top right:
1. Authorize the Lovable GitHub App
2. Select your GitHub account/organization
3. Create repository

Changes sync bidirectionally between Lovable and GitHub.

## Getting Started

1. Sign up as either a Gig Provider or Gig Seeker
2. **Providers**: Create and manage your gig listings
3. **Seekers**: Browse and filter available gigs


## Support

- [Documentation](https://docs.lovable.dev/)
- [Discord Community](https://discord.com/channels/1119885301872070706/1280461670979993613)
- [YouTube Tutorials](https://www.youtube.com/watch?v=9KHLTZaJcR8&list=PLbVHz4urQBZkJiAWdG8HWoJTdgEysigIO)
