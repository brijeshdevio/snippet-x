import { Copy, Pen, Trash2 } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { anOldHope as codeTheme } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useSnippet } from "@/hooks/useSnippet";
import { timeAgo } from "@/utils/timeAgo";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader } from "@/components";

export function Snippet() {
  const { snippetId } = useParams();
  const { getSnippetMutate, deleteSnippetMutate } = useSnippet();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (snippetId)
      await deleteSnippetMutate.mutateAsync(snippetId).then(() => {
        navigate("/snippets");
      });
  };

  const handleCopyCode = () => {
    const code = getSnippetMutate.data?.snippet?.code;
    if (code) {
      navigator.clipboard.writeText(code);
      toast.success("Code copy into clipboard.");
    }
  };

  useEffect(() => {
    if (snippetId) getSnippetMutate.mutate(snippetId);
  }, [snippetId]);

  if (getSnippetMutate.isPending) {
    return <Loader />;
  }

  return (
    <>
      <section className="flex flex-col gap-3 py-5">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold tracking-tight md:text-3xl">
            {getSnippetMutate.data?.snippet.title}
          </h1>
          <p className="font-normal text-foreground/60 text-sm">
            Last Updated:{" "}
            {timeAgo(getSnippetMutate.data?.snippet.updatedAt, "")}
          </p>
        </div>
        <div className="flex flex-wrap justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {getSnippetMutate.data?.snippet.tags?.map(
              (tag: string, index: number) => (
                <>
                  <Badge key={index} variant={"secondary"}>
                    {tag}
                  </Badge>
                </>
              )
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size={"sm"}>
              <Pen />
              <span>Edit</span>
            </Button>
            <Button variant={"outline"} size={"sm"} onClick={handleCopyCode}>
              <Copy />
            </Button>
            <Button
              variant={"destructive"}
              size={"sm"}
              onClick={handleDelete}
              disabled={deleteSnippetMutate.isPending}
              type="button"
            >
              {deleteSnippetMutate.isPending ? "Deleting..." : <Trash2 />}
            </Button>
          </div>
        </div>
        <div className="rounded overflow-hidden border text-sm">
          <SyntaxHighlighter language="javascript" style={codeTheme}>
            {getSnippetMutate.data?.snippet.code}
          </SyntaxHighlighter>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Note/Description</h2>
          <p className="text-foreground/80">
            {getSnippetMutate.data?.snippet.description}
          </p>
        </div>
      </section>
    </>
  );
}
