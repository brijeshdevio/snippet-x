import type { SnippetsType } from "@/types/snippet";

export function Pagination({
  hasNext,
  hasPrev,
  totalPages,
  page,
  onClick = () => {},
}: SnippetsType["meta"] & { onClick: (page: number) => void }) {
  const handleClick = (page: number) => {
    return () => onClick(page);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="join">
        <button
          className="join-item btn
        disabled:cursor-not-allowed
        "
          disabled={!hasPrev}
          onClick={handleClick(page - 1)}
        >
          «
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className="join-item btn"
            disabled={index + 1 === page}
            onClick={handleClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="join-item btn"
          disabled={!hasNext}
          onClick={handleClick(page + 1)}
        >
          »
        </button>
      </div>
    </div>
  );
}
