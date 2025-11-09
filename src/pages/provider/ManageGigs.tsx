import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { GigCard } from "@/components/gig/GigCard";
import { GigForm } from "@/components/gig/GigForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Loader2 } from "lucide-react";

interface Gig {
  id: string;
  title: string;
  description: string;
  location: string | null;
  budget: number | null;
  category: string;
  status: string;
}

export const ManageGigs = () => {
  const { user } = useAuth();
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGig, setEditingGig] = useState<Gig | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchGigs();
  }, [user]);

  const fetchGigs = async () => {
    try {
      const { data, error } = await supabase
        .from("gigs")
        .select("*")
        .eq("provider_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setGigs(data || []);
    } catch (error) {
      console.error("Error fetching gigs:", error);
      toast.error("Failed to load gigs");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      const gigData = {
        title: formData.title,
        description: formData.description,
        location: formData.location || null,
        budget: formData.budget ? parseFloat(formData.budget) : null,
        category: formData.category,
        status: formData.status,
        provider_id: user?.id,
      };

      if (editingGig) {
        const { error } = await supabase
          .from("gigs")
          .update(gigData)
          .eq("id", editingGig.id);

        if (error) throw error;
        toast.success("Gig updated successfully!");
      } else {
        const { error } = await supabase
          .from("gigs")
          .insert([gigData]);

        if (error) throw error;
        toast.success("Gig created successfully!");
      }

      setIsDialogOpen(false);
      setEditingGig(null);
      fetchGigs();
    } catch (error: any) {
      console.error("Error saving gig:", error);
      toast.error(error.message || "Failed to save gig");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (id: string) => {
    const gig = gigs.find((g) => g.id === id);
    if (gig) {
      setEditingGig(gig);
      setIsDialogOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gig?")) return;

    try {
      const { error } = await supabase.from("gigs").delete().eq("id", id);

      if (error) throw error;
      toast.success("Gig deleted successfully!");
      fetchGigs();
    } catch (error: any) {
      console.error("Error deleting gig:", error);
      toast.error(error.message || "Failed to delete gig");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">My Gigs</h2>
          <p className="text-muted-foreground">Manage your gig listings</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingGig(null);
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Gig
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingGig ? "Edit Gig" : "Create New Gig"}</DialogTitle>
            </DialogHeader>
            <GigForm
              onSubmit={handleSubmit}
              defaultValues={editingGig ? {
                title: editingGig.title,
                description: editingGig.description,
                location: editingGig.location || "",
                budget: editingGig.budget?.toString() || "",
                category: editingGig.category,
                status: editingGig.status,
              } : undefined}
              isLoading={isSubmitting}
            />
          </DialogContent>
        </Dialog>
      </div>

      {gigs.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground mb-4">You haven't created any gigs yet.</p>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Gig
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.map((gig) => (
            <GigCard
              key={gig.id}
              gig={gig}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isProvider
            />
          ))}
        </div>
      )}
    </div>
  );
};
