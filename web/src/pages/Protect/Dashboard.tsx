import { Search } from "lucide-react";
import { Loader, NewSnippetCard, Pagination, SnippetCard } from "@/components";
import type { SnippetCardType, SnippetsType } from "@/types/snippet";
import { useDashboardFacade } from "@/hooks/useDashboardFacade";

type SnippetSectionProps = {
  data: SnippetsType;
  isLoading: boolean;
  query: URLSearchParams;
  onClick: (page: number) => void;
};

function SnippetSection({
  data,
  isLoading,
  onClick = () => {},
  query,
}: SnippetSectionProps) {
  if (isLoading) {
    return <Loader className="!h-[calc(100vh-250px)]" />;
  }

  if (data?.snippets.length === 0 && !query) {
    return <NewSnippetCard />;
  }

  if (data?.snippets.length == 0) {
    return (
      <div className="w-full h-[calc(100vh-250px)] flex items-center justify-center ">
        <p className="opacity-70">
          Snippets not found. please try different query.
        </p>
      </div>
    );
  }

  return (
    <section
      className={`w-full sm:w-[90%] flex flex-col gap-4 mx-auto px-3 py-5
        ${data?.snippets?.length == 0 && "hidden"}
        `}
    >
      {data?.snippets?.map((snippet: SnippetCardType) => (
        <SnippetCard key={snippet._id} {...snippet} />
      ))}
      <Pagination {...data?.meta} onClick={onClick} />
    </section>
  );
}

export function Dashboard() {
  const { handleClear, handleFetch, setQuery, user, isLoading, data, query } =
    useDashboardFacade();

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
        <div className="w-full sm:w-[90%] flex items-center justify-between gap-2  mx-auto px-3 ">
          <form className="w-full">
            <label className="input w-full max-w-[500px]">
              <Search size={20} className="opacity-70" />
              <input
                type="search"
                placeholder="Search private snippets..."
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </form>
          <button className="btn btn-ghost btn-sm" onClick={handleClear}>
            Clear
          </button>
        </div>
      </section>
      <SnippetSection
        isLoading={isLoading}
        data={data}
        onClick={handleFetch}
        query={query}
      />
    </>
  );
}
