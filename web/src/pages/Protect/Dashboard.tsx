import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { NewSnippetCard, Pagination, SnippetCard } from "@/components";
// import { generateSnippets } from "@/data";
import { useSnippet } from "@/hooks/useSnippet";
import { useAuth } from "@/auth";
import type { SnippetCardType, SnippetsType } from "@/types/snippet";
import { useSearchParams } from "react-router-dom";

export function Dashboard() {
  const { user } = useAuth();
  const [query] = useSearchParams();
  const { snippetsQueryMutation } = useSnippet();
  const [value, setQuery] = useState("");

  const handleRefresh = (page: number) => {
    snippetsQueryMutation.mutate({ page: page });
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

  return (
    <>
      <section>
        <div className="w-full sm:w-[90%] mx-auto px-3 py-5">
          <h2 className="text-3xl">
            Welcome, <strong className="text-primary">{user?.name}</strong>
          </h2>
          <p className="text-base font-normal opacity-70">
            Efficiently browse and manage your code snippet collection.
          </p>
        </div>
      </section>

      <section className="py-3 bg-base-100 border-t border-b border-white/5">
        <div className="w-full sm:w-[90%] mx-auto px-3 ">
          <form>
            <label className="input w-full max-w-[500px]">
              <Search size={20} className="opacity-70" />
              <input
                type="text"
                placeholder="Search private snippets..."
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </form>
        </div>
      </section>

      {data?.snippets?.length == 0 && <NewSnippetCard />}

      <section
        className={`w-full sm:w-[90%] flex flex-col gap-4 mx-auto px-3 py-5
        ${data?.snippets?.length == 0 && "hidden"}
        `}
      >
        {data?.snippets?.map((snippet: SnippetCardType) => (
          <SnippetCard key={snippet._id} {...snippet} />
        ))}
        <Pagination {...data?.meta} onClick={handleRefresh} />
      </section>
    </>
  );
}
