import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

export function NewSnippetCard() {
  return (
    <section className="w-[95%] sm:w-[90%] mx-auto flex items-center justify-center px-3 py-10 border border-dashed rounded-2xl bg-base-100 mt-20">
      <div className="text-center">
        <h3 className="text-xl">No snippets yet</h3>
        <p className="text-sm opacity-70">
          Get started by creating your fist code snippet
        </p>
        <Link to={"/new"} className="btn btn-primary btn-sm mt-5">
          <Plus size={20} />
          <span>Create New Snippet</span>
        </Link>
      </div>
    </section>
  );
}
