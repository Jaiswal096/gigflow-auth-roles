import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Briefcase } from "lucide-react";

interface GigCardProps {
  gig: {
    id: string;
    title: string;
    description: string;
    location: string | null;
    budget: number | null;
    category: string;
    status: string;
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  isProvider?: boolean;
}

const categoryLabels: Record<string, string> = {
  web_development: "Web Development",
  mobile_development: "Mobile Development",
  design: "Design",
  writing: "Writing",
  marketing: "Marketing",
  video_editing: "Video Editing",
  photography: "Photography",
  consulting: "Consulting",
  other: "Other"
};

export const GigCard = ({ gig, onEdit, onDelete, isProvider = false }: GigCardProps) => {
  const statusColors: Record<string, string> = {
    open: "bg-green-500/10 text-green-500 border-green-500/20",
    in_progress: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    completed: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    closed: "bg-red-500/10 text-red-500 border-red-500/20"
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-xl">{gig.title}</CardTitle>
          <Badge className={statusColors[gig.status]}>{gig.status.replace('_', ' ')}</Badge>
        </div>
        <CardDescription className="flex items-center gap-2 text-sm">
          <Briefcase className="h-4 w-4" />
          {categoryLabels[gig.category]}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-muted-foreground line-clamp-3">{gig.description}</p>
        <div className="flex flex-wrap gap-4 text-sm">
          {gig.location && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {gig.location}
            </div>
          )}
          {gig.budget && (
            <div className="flex items-center gap-1 text-primary font-semibold">
              <DollarSign className="h-4 w-4" />
              ${gig.budget.toLocaleString()}
            </div>
          )}
        </div>
      </CardContent>
      {isProvider && (
        <CardFooter className="flex gap-2">
          <Button variant="outline" onClick={() => onEdit?.(gig.id)} className="flex-1">
            Edit
          </Button>
          <Button variant="destructive" onClick={() => onDelete?.(gig.id)} className="flex-1">
            Delete
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
