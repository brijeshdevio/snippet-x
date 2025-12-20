import { languages } from "@/data";
import { useSnippet } from "@/hooks/useSnippet";
import type { ContentType, GenerateSnippet } from "@/types/snippet";
import { Sparkles, X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { androidstudio as codeTheme } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface GenerateSnippetProps {
  onClose: () => void;
  onContent: (content: ContentType) => void;
}

export function GenerateSnippet({
  onClose = () => {},
  onContent = () => {},
}: GenerateSnippetProps) {
  const { generateSnippetMutation } = useSnippet();
  const [language, setLanguage] = useState("JavaScript");
  const [title, setTitle] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(
      formData.entries()
    ) as unknown as GenerateSnippet;

    if (!data.language) {
      data.language = "JavaScript";
    }

    generateSnippetMutation.mutate(data);
  };

  const handleOnCancel = () => {
    onContent({});
    onClose();
  };

  useEffect(() => {
    if (
      generateSnippetMutation.isSuccess &&
      generateSnippetMutation.data?.code
    ) {
      onContent({
        language: language?.toLowerCase(),
        snippet: generateSnippetMutation.data?.code,
        title: title,
      });
    }
  }, [generateSnippetMutation, onContent, language, title]);

  return (
    <div className="fixed top-0 left-0 z-[999] w-full h-screen min-h-[400px] flex items-center justify-center p-3 bg-base-300/80">
      <div className="card bg-base-100 w-full max-w-[500px] border border-white/10 shadow-2xl">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-1 text-xl">
              <Sparkles className="text-warning" size={20} /> Generate Snippet
            </h2>
            <button className="btn btn-ghost btn-circle" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="prompt" className="text-sm opacity-90">
                What do you want to generate?
              </label>
              <textarea
                name="prompt"
                id="prompt"
                className="textarea w-full h-20 resize-none"
                placeholder="e.g. A function to calculate the factorial of a number..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="language" className="text-sm opacity-90">
                Language
              </label>
              <select
                className="select select-bordered"
                id="language"
                name="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {languages.map((lang) => (
                  <option key={`gene_lang_${lang}`} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            {!generateSnippetMutation.isPending &&
              generateSnippetMutation.data?.code && (
                <div className="rounded-xl overflow-hidden border border-white/5 text-sm shadow p-2 bg-base-100">
                  <SyntaxHighlighter
                    showLineNumbers={true}
                    language={"typescript"}
                    customStyle={{ borderRadius: 10, maxHeight: "260px" }}
                    style={codeTheme}
                  >
                    {generateSnippetMutation.data?.code}
                  </SyntaxHighlighter>
                </div>
              )}
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                className="btn btn-sm sm:btn-md"
                onClick={handleOnCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-sm sm:btn-md"
                disabled={generateSnippetMutation.isPending}
              >
                {generateSnippetMutation.isPending ? (
                  <>
                    <Sparkles size={20} />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    <span>Generate</span>
                  </>
                )}
              </button>
              <button
                type="button"
                className="btn btn-sm sm:btn-md"
                onClick={onClose}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
