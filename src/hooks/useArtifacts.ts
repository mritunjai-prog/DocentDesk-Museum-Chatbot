import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
      const { data, error } = await supabase
        .from("artifacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Artifact[];
    },
  });
};

export const useFeaturedArtifacts = () => {
  return useQuery({
    queryKey: ["artifacts", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("artifacts")
        .select("*")
        .eq("is_featured", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Artifact[];
    },
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
