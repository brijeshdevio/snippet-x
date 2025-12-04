import { useEffect } from "react";
import { Search } from "lucide-react";
import { NewSnippetCard, SnippetCard } from "@/components";
// import { generateSnippets } from "@/data";
import { useSnippet } from "@/hooks/useSnippet";
import { useAuth } from "@/auth";
import type { SnippetCardType } from "@/types/snippet";

export function Dashboard() {
  const { user } = useAuth();
  const { snippetsQueryMutation } = useSnippet();

  useEffect(() => {
    snippetsQueryMutation.mutate();
  }, []);

  const data = snippetsQueryMutation.data as unknown as {
    snippets: SnippetCardType[];
  };
  const snippets = data?.snippets || [];

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
              <input type="text" placeholder="Search public snippets..." />
            </label>
          </form>
        </div>
      </section>

      {snippets?.length == 0 && <NewSnippetCard />}

      <section className="w-full sm:w-[90%] flex flex-col gap-4 mx-auto px-3 py-5">
        {snippets?.map((snippet: SnippetCardType) => (
          <SnippetCard key={snippet._id} {...snippet} />
        ))}
      </section>
    </>
  );
}
