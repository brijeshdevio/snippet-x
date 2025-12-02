import { Copy, Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import SyntaxHighlighter from "react-syntax-highlighter";
import { androidstudio as codeTheme } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { timeAgo } from "@/utils/timeAgo";
import { snippet } from "@/data";
import { useState } from "react";

export function SingleSnippet() {
  const [isLineNumber, setIsLineNumber] = useState(false);
  const [isWrapCode, setIsWrapCode] = useState(false);

  const handleDelete = async () => {};

  const handleCopyCode = () => {
    const code = snippet.code;
    if (code) {
      navigator.clipboard.writeText(code);
      toast.success("Code copy into clipboard.");
    }
  };

  const handleToggleLineNumber = () => {
    setIsLineNumber(!isLineNumber);
  };

  const handleToggleWrapCode = () => {
    setIsWrapCode(!isWrapCode);
  };

  return (
    <>
      <section className="w-full sm:w-[90%] flex flex-col gap-3 mx-auto px-3 py-5">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold tracking-tight md:text-3xl">
            {snippet.title}
          </h1>
          <p className="font-normal opacity-70 text-sm">
            Last Updated: {timeAgo(snippet.updated, "")}
          </p>
        </div>
        <div className="flex flex-wrap justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {snippet.tags?.map((tag: string, index: number) => (
              <>
                <span className="badge" key={index}>
                  {tag}
                </span>
              </>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="btn btn-sm btn-circle">
              <Edit size={17} />
            </button>
            <button className="btn btn-sm btn-circle" onClick={handleCopyCode}>
              <Copy size={17} />
            </button>
            <button
              className="btn btn-sm btn-circle text-error"
              onClick={handleDelete}
            >
              <Trash size={17} />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-5 bg-base-100 p-2 rounded-lg border border-white/5">
          <div>
            <label>
              <input
                type="checkbox"
                checked={isLineNumber}
                onChange={handleToggleLineNumber}
                className="checkbox checkbox-sm checkbox-primary"
              />
              <span className="ml-2 text-sm">Show Line Number</span>
            </label>
          </div>
          <div className="border-l border-white/5 h-4"></div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={isWrapCode}
                onChange={handleToggleWrapCode}
                className="checkbox checkbox-sm checkbox-primary"
              />
              <span className="ml-2 text-sm">Wrap Code</span>
            </label>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden border border-white/5 text-sm shadow p-2 bg-base-100">
          <SyntaxHighlighter
            showLineNumbers={isLineNumber}
            wrapLongLines={isWrapCode}
            language={snippet.language}
            customStyle={{ borderRadius: 10 }}
            style={codeTheme}
          >
            {snippet.code}
          </SyntaxHighlighter>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Note/Description</h2>
          <p className="text-foreground/80">{snippet.description}</p>
        </div>
      </section>
    </>
  );
}
