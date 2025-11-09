import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Briefcase, Search, User, LogOut } from 'lucide-react';

const Dashboard = () => {
  const { user, userRole, signOut } = useAuth();

  const isGigSeeker = userRole === 'gig_seeker';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-primary">GigConnect</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold">
            {isGigSeeker ? 'Gig Seeker Dashboard' : 'Gig Provider Dashboard'}
          </h2>
          <p className="text-muted-foreground">
            {isGigSeeker
              ? 'Find and apply for gigs that match your skills'
              : 'Manage your services and connect with clients'}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isGigSeeker ? (
            <>
              <Card className="p-6 shadow-card-custom transition-all hover:shadow-glow">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Browse Gigs</h3>
                <p className="mb-4 text-muted-foreground">
                  Explore thousands of available opportunities
                </p>
                <Button className="w-full">Start Browsing</Button>
              </Card>

              <Card className="p-6 shadow-card-custom transition-all hover:shadow-glow">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <Briefcase className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">My Applications</h3>
                <p className="mb-4 text-muted-foreground">Track your applied gigs and status</p>
                <Button variant="secondary" className="w-full">
                  View Applications
                </Button>
              </Card>

              <Card className="p-6 shadow-card-custom transition-all hover:shadow-glow">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <User className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Profile</h3>
                <p className="mb-4 text-muted-foreground">
                  Update your skills and preferences
                </p>
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </Card>
            </>
          ) : (
            <>
              <Card className="p-6 shadow-card-custom transition-all hover:shadow-glow">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">My Services</h3>
                <p className="mb-4 text-muted-foreground">
                  Manage your service offerings
                </p>
                <Button className="w-full">Manage Services</Button>
              </Card>

              <Card className="p-6 shadow-card-custom transition-all hover:shadow-glow">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <Search className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Client Requests</h3>
                <p className="mb-4 text-muted-foreground">
                  View and respond to client inquiries
                </p>
                <Button variant="secondary" className="w-full">
                  View Requests
                </Button>
              </Card>

              <Card className="p-6 shadow-card-custom transition-all hover:shadow-glow">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <User className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Profile</h3>
                <p className="mb-4 text-muted-foreground">
                  Showcase your expertise and portfolio
                </p>
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </Card>
            </>
          )}
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card className="bg-gradient-card p-6 text-center">
            <div className="mb-2 text-4xl font-bold text-primary">0</div>
            <div className="text-muted-foreground">
              {isGigSeeker ? 'Active Applications' : 'Active Gigs'}
            </div>
          </Card>
          <Card className="bg-gradient-card p-6 text-center">
            <div className="mb-2 text-4xl font-bold text-secondary">0</div>
            <div className="text-muted-foreground">
              {isGigSeeker ? 'Completed Gigs' : 'Completed Projects'}
            </div>
          </Card>
          <Card className="bg-gradient-card p-6 text-center">
            <div className="mb-2 text-4xl font-bold text-accent">0</div>
            <div className="text-muted-foreground">Profile Views</div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
