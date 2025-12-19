import { useArtifacts } from "./useArtifacts";
import { useState, useEffect } from "react";

export interface ChatContext {
  currentPage?: string;
  artifacts?: any[];
  recentArtifacts?: string[];
  userLocation?: string;
}

export const useChatContext = (): ChatContext => {
  const { data: artifacts } = useArtifacts();
  const [context, setContext] = useState<ChatContext>({});

  useEffect(() => {
    // Detect current page
    const currentPath = window.location.pathname;
    let currentPage = "home";

    if (currentPath.includes("/tour")) {
      currentPage = "virtual-tour";
    } else if (currentPath.includes("/events")) {
      currentPage = "events";
    } else if (currentPath.includes("/dashboard")) {
      currentPage = "dashboard";
    }

    // Get recent artifacts from localStorage
    const recentArtifactsStr = localStorage.getItem("recentArtifacts");
    const recentArtifacts = recentArtifactsStr
      ? JSON.parse(recentArtifactsStr)
      : [];

    setContext({
      currentPage,
      artifacts: artifacts || [],
      recentArtifacts,
    });
  }, [artifacts]);

  return context;
};

// Helper to add artifact to recent views
export const addToRecentArtifacts = (artifactId: string) => {
  const recentStr = localStorage.getItem("recentArtifacts") || "[]";
  const recent = JSON.parse(recentStr) as string[];

  // Add to beginning, remove duplicates, keep last 10
  const updated = [
    artifactId,
    ...recent.filter((id) => id !== artifactId),
  ].slice(0, 10);

  localStorage.setItem("recentArtifacts", JSON.stringify(updated));
};
