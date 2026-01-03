import { useAuth } from "@/auth";
import type { SnippetsType } from "@/types/snippet";
import { useSearchParams } from "react-router-dom";
import { useSnippet } from "./useSnippet";
import { useEffect, useState } from "react";

export function useDashboardFacade() {
  const { user } = useAuth();
  const [value, setQuery] = useState("");
  const [query, setSearchQuery] = useSearchParams();
  const { snippetsQueryMutation } = useSnippet();

  const handleFetch = (page: number) => {
    snippetsQueryMutation.mutate({ page: page });
  };

  const handleClear = () => {
    if (query.size > 0) {
      setSearchQuery({});
      snippetsQueryMutation.mutate({});
    }
  };

  useEffect(() => {
    const folder = query.get("folder");
    const language = query.get("language");
    if (folder) snippetsQueryMutation.mutate({ folder: folder });
    if (language) snippetsQueryMutation.mutate({ language: language });
  }, [query]);

  useEffect(() => {
    snippetsQueryMutation.mutate({ limit: 10 });
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      snippetsQueryMutation.mutate({ search: value });
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value, setQuery]);

  const data = snippetsQueryMutation.data as unknown as SnippetsType;
  const isLoading = snippetsQueryMutation.isPending;
  const error = snippetsQueryMutation.error;

  return { handleClear, handleFetch, setQuery, user, data, isLoading, error, query }
}