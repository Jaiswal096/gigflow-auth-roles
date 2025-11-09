import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { ManageGigs } from './provider/ManageGigs';
import { BrowseGigs } from './seeker/BrowseGigs';

const Dashboard = () => {
  const { user, userRole, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            GigConnect
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-right hidden sm:block">
              <p className="font-medium">{user?.email}</p>
              <p className="text-muted-foreground capitalize text-xs">
                {userRole?.replace('_', ' ')}
              </p>
            </div>
            <Button onClick={signOut} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        {userRole === 'gig_provider' && <ManageGigs />}
        {userRole === 'gig_seeker' && <BrowseGigs />}
      </main>
    </div>
  );
};

export default Dashboard;
