import type { FormEvent } from "react";
import { languages } from "@/data";
import { useSnippet } from "@/hooks/useSnippet";
import type { CreateSnippetType } from "@/types/snippet";
import { useFolder } from "@/hooks/useFolder";

export function NewSnippet() {
  const { createSnippetMutation } = useSnippet();
  const { getFoldersQuery } = useFolder();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries()) as unknown as {
      tags: string | string[];
    };
    if (typeof data.tags == "string") {
      data.tags = data?.tags?.split(",");
    }
    await createSnippetMutation
      .mutateAsync(data as unknown as CreateSnippetType)
      .finally(() => e.currentTarget.reset());
  };

  return (
    <section className="w-full sm:w-[90%] flex flex-col gap-5 mx-auto px-3 py-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl">Create New Snippet</h2>
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
            >
              {languages.map((lang) => (
                <option key={`new_lang_${lang}`} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="folder" className="text-sm opacity-90">
              Folder
            </label>
            <select
              className="select select-bordered"
              id="folder"
              name="folder"
            >
              {getFoldersQuery?.data?.folders.map(
                (f: { name: string; _id: string }) => (
                  <option key={f._id} value={f._id}>
                    {f.name}
                  </option>
                )
              )}
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
          />
        </div>
        <div className="flex items-center justify-end gap-5">
          <button className="btn btn-error btn-sm sm:btn-md" type="button">
            Cancel
          </button>
          <button className="btn btn-primary btn-sm sm:btn-md" type="submit">
            Save
          </button>
        </div>
      </form>
    </section>
  );
}
