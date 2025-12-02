import { Search } from "lucide-react";
import { SnippetCard } from "@/components";
import { generateSnippets } from "@/data";

export function Dashboard() {
  return (
    <>
      <section>
        <div className="w-full sm:w-[90%] mx-auto px-3 py-5">
          <h2 className="text-3xl">
            Welcome, <strong className="text-primary">Jasmine</strong>
          </h2>
          <p className="text-base font-normal opacity-70">
            Efficiently browse and manage your code snippet collection.
          </p>
        </div>
      </section>

      <section className="py-3 bg-base-100 border-t border-b border-white/5">
        <div className="w-full sm:w-[90%] mx-auto px-3 ">
          <form>
            <label className="input w-full sm:w-[500px]">
              <Search size={20} className="opacity-70" />
              <input type="text" placeholder="Search public snippets..." />
            </label>
          </form>
        </div>
      </section>

      <section className="w-full sm:w-[90%] flex flex-col gap-4 mx-auto px-3 py-5">
        {generateSnippets(10)?.map((snippet) => (
          <SnippetCard key={snippet.title} {...snippet} />
        ))}
      </section>
    </>
  );
}
