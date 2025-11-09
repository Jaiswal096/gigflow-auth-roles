import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Search, Shield, Zap } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="mb-6 text-5xl font-bold text-primary-foreground md:text-6xl">
            Connect, Collaborate, Complete
          </h1>
          <p className="mb-8 text-xl text-primary-foreground/90 md:text-2xl">
            The marketplace where gig seekers find opportunities and providers showcase their skills
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/auth')}
              className="text-lg shadow-glow"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/auth')}
              className="border-primary-foreground/30 text-lg text-primary-foreground hover:bg-primary-foreground/10"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-4xl font-bold">Why Choose GigConnect?</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6 shadow-card-custom transition-all hover:shadow-glow">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Find Opportunities</h3>
              <p className="text-muted-foreground">
                Browse thousands of gigs tailored to your skills and interests
              </p>
            </Card>

            <Card className="p-6 shadow-card-custom transition-all hover:shadow-glow">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                <Briefcase className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Showcase Skills</h3>
              <p className="text-muted-foreground">
                Build your profile and let clients discover your expertise
              </p>
            </Card>

            <Card className="p-6 shadow-card-custom transition-all hover:shadow-glow">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Secure Platform</h3>
              <p className="text-muted-foreground">
                Protected transactions and verified users for peace of mind
              </p>
            </Card>

            <Card className="p-6 shadow-card-custom transition-all hover:shadow-glow">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Fast & Easy</h3>
              <p className="text-muted-foreground">
                Quick setup and intuitive interface to start working immediately
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-bold">Ready to Get Started?</h2>
          <p className="mb-8 text-xl text-muted-foreground">
            Join thousands of professionals already using GigConnect
          </p>
          <Button size="lg" onClick={() => navigate('/auth')} className="shadow-glow">
            Sign Up Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
