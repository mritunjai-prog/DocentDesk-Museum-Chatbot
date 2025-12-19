import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { mockArtifacts } from "@/data/artifacts";

export interface Artifact {
  id: string;
  name: string;
  description: string | null;
  category: string;
  era: string | null;
  origin: string | null;
  image_url: string | null;
  model_url: string | null;
  position_x: number | null;
  position_y: number | null;
  position_z: number | null;
  is_featured: boolean | null;
  created_at: string;
  updated_at: string;
}

export const useArtifacts = () => {
  return useQuery({
    queryKey: ["artifacts"],
    queryFn: async () => {
      try {
        // Try to fetch from Supabase first with a timeout
        const { data, error } = (await Promise.race([
          supabase
            .from("artifacts")
            .select("*")
            .order("created_at", { ascending: false }),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout")), 3000)
          ),
        ])) as any;

        // If we have data from Supabase, use it
        if (!error && data && data.length > 0) {
          return data as Artifact[];
        }
      } catch (err) {
        console.log("Using mock data:", err);
      }

      // Otherwise, return mock data
      return mockArtifacts as Artifact[];
    },
    initialData: mockArtifacts as Artifact[], // Show mock data immediately
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });
};

export const useFeaturedArtifacts = () => {
  return useQuery({
    queryKey: ["artifacts", "featured"],
    queryFn: async () => {
      try {
        // Try to fetch from Supabase first with a timeout
        const { data, error } = (await Promise.race([
          supabase
            .from("artifacts")
            .select("*")
            .eq("is_featured", true)
            .order("created_at", { ascending: false }),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout")), 3000)
          ),
        ])) as any;

        // If we have data from Supabase, use it
        if (!error && data && data.length > 0) {
          return data as Artifact[];
        }
      } catch (err) {
        console.log("Using mock featured data:", err);
      }

      // Otherwise, return mock featured artifacts
      return mockArtifacts.filter((a) => a.is_featured) as Artifact[];
    },
    initialData: mockArtifacts.filter((a) => a.is_featured) as Artifact[], // Show mock data immediately
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useArtifact = (id: string) => {
  return useQuery({
    queryKey: ["artifact", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("artifacts")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data as Artifact | null;
    },
    enabled: !!id,
  });
};
