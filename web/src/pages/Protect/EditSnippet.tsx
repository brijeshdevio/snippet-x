import { useEffect, type FormEvent } from "react";
import { languages } from "@/data";
import { useSnippet } from "@/hooks/useSnippet";
import { Loader } from "@/components";
import type { CreateSnippetType, SnippetType } from "@/types/snippet";
import { Link, useNavigate } from "react-router-dom";

export function EditSnippet() {
  const { snippetQueryMutation, updateSnippetMutation } = useSnippet();
  const navigate = useNavigate();

  useEffect(() => {
    snippetQueryMutation.mutate();
  }, []);

  if (snippetQueryMutation.isPending) {
    return <Loader />;
  }

  const data = snippetQueryMutation.data as unknown as { snippet: SnippetType };
  const { snippet } = data || {};

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries()) as unknown as {
      tags: string | string[];
    };
    if (typeof data.tags == "string") {
      data.tags = data?.tags?.split(",");
    }
    await updateSnippetMutation
      .mutateAsync(data as unknown as CreateSnippetType)
      .finally(() => {
        navigate("/dashboard");
      });
  };

  return (
    <section className="w-full sm:w-[90%] flex flex-col gap-5 mx-auto px-3 py-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl">Edit Snippet Details</h2>
        <p className="text-sm opacity-90">
          This information will be displayed publicly so be careful what you
          share. Ensure you are not sharing sensitve information or private
          information.
        </p>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="text-sm opacity-90">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="e.g., JavaScript Hello World"
              className="input input-bordered w-full"
              defaultValue={snippet?.title}
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
              defaultValue={snippet?.language}
            >
              {languages.map((lang) => (
                <option key={`edit_lang_${lang}`} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="code" className="text-sm opacity-90">
            Code
          </label>
          <textarea
            name="code"
            id="code"
            className="textarea w-full h-60 resize-none"
            placeholder="console.log('Hello World!'');"
            defaultValue={snippet?.code}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-sm opacity-90">
            Note/Description
          </label>
          <textarea
            name="description"
            id="description"
            className="textarea h-20 resize-none w-full"
            placeholder=""
            defaultValue={snippet?.description}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="tags" className="text-sm opacity-90">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            className="input input-bordered w-full min-w-32"
            placeholder="e.g. React, JS, Vue"
            defaultValue={snippet?.tags?.join(", ")}
          />
        </div>
        <div className="flex items-center justify-end gap-5">
          <Link
            to="/dashboard"
            className="btn btn-error btn-sm sm:btn-md"
            type="button"
          >
            Cancel
          </Link>
          <button
            className="btn btn-primary btn-sm sm:btn-md"
            type="submit"
            disabled={updateSnippetMutation.isPending}
          >
            {updateSnippetMutation.isPending ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
