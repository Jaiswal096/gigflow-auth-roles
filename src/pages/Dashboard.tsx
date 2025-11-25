import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Briefcase, Users } from 'lucide-react';
import { ManageGigs } from './provider/ManageGigs';
import { BrowseGigs } from './seeker/BrowseGigs';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const { user, userRole, signOut } = useAuth();
  const [stats, setStats] = useState({ totalGigs: 0, openGigs: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      if (userRole === 'gig_provider') {
        const { count: total } = await supabase
          .from('gigs')
          .select('*', { count: 'exact', head: true })
          .eq('provider_id', user?.id);
        
        const { count: open } = await supabase
          .from('gigs')
          .select('*', { count: 'exact', head: true })
          .eq('provider_id', user?.id)
          .eq('status', 'open');
        
        setStats({ totalGigs: total || 0, openGigs: open || 0 });
      } else {
        const { count: open } = await supabase
          .from('gigs')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'open');
        
        setStats({ totalGigs: open || 0, openGigs: open || 0 });
      }
    };

    if (user && userRole) {
      fetchStats();
    }
  }, [user, userRole]);

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
        <div className="mb-8 grid gap-4 md:grid-cols-2">
          <Card className="border-border/50 bg-background/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {userRole === 'gig_provider' ? 'Total Gigs' : 'Available Gigs'}
              </CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalGigs}</div>
              <p className="text-xs text-muted-foreground">
                {userRole === 'gig_provider' ? 'Gigs you created' : 'Open opportunities'}
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-border/50 bg-background/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {userRole === 'gig_provider' ? 'Open Gigs' : 'Active Searches'}
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.openGigs}</div>
              <p className="text-xs text-muted-foreground">
                {userRole === 'gig_provider' ? 'Currently accepting applications' : 'Browse all categories'}
              </p>
            </CardContent>
          </Card>
        </div>

        {userRole === 'gig_provider' && <ManageGigs />}
        {userRole === 'gig_seeker' && <BrowseGigs />}
      </main>
    </div>
  );
};

export default Dashboard;
