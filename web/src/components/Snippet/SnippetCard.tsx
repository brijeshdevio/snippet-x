import { useSnippet } from "@/hooks/useSnippet";
import type { SnippetCardType } from "@/types/snippet";
import { timeAgo } from "@/utils";
import { Braces, Copy, Edit, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export function SnippetCard({
  _id,
  title,
  description,
  language,
  tags,
  updatedAt,
}: SnippetCardType) {
  const { deleteSnippetMutation } = useSnippet();
  const handleDelete = async () => {
    deleteSnippetMutation.mutateAsync(_id);
  };

  return (
    <motion.div
      whileHover={{
        scale: 0.9,
        transition: { duration: 1 },
      }}
      className="group card bg-base-100"
    >
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Braces className="text-primary" size={25} />
            <span className="badge badge-outline">{language}</span>
          </div>
          <div className="invisible group-hover:visible flex items-center gap-2 sm:gap-3">
            <Link
              to={`/snippets/${_id}/edit`}
              className="btn btn-sm btn-ghost btn-circle"
            >
              <Edit size={17} />
            </Link>
            <button className="btn btn-sm btn-ghost btn-circle">
              <Copy size={17} />
            </button>
            <button
              className="btn btn-sm btn-ghost btn-circle text-error"
              onClick={handleDelete}
              disabled={deleteSnippetMutation?.isPending}
            >
              {deleteSnippetMutation?.isPending ? (
                <span className="loading loading-spinner text-error"></span>
              ) : (
                <Trash size={17} />
              )}
            </button>
          </div>
        </div>

        <h3 className="line-clamp-2 font-semibold text-lg">{title}</h3>
        <p className="text-foreground/80 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags?.map(
            (tag, index: number) =>
              tag && (
                <span key={index} className="badge">
                  {tag}
                </span>
              )
          )}
        </div>
        <div className="flex items-center justify-between">
          <p className="opacity-70 text-sm">{timeAgo(updatedAt)}</p>
          <Link to={`/snippets/${_id}`} className="btn btn-sm">
            <button>View Snippet</button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
