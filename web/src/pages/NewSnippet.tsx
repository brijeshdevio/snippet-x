import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { languages } from "@/data";
import { useSnippet } from "@/hooks/useSnippet";
import type { CreateSnippetType } from "@/types/snippet";

export function NewSnippet() {
  const { createMutate } = useSnippet();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries()) as unknown as {
      tags: string | string[];
    };
    if (typeof data.tags == "string") {
      data.tags = data?.tags?.split(",");
    }
    createMutate.mutate(data as unknown as CreateSnippetType);
  };

  return (
    <section className="w-full flex flex-col gap-4 py-5">
      <div>
        <h2 className="text-2xl">Create New Snippet</h2>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="e.g., JavaScript Hello World"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="language">Select Language</Label>
            <Select name="language">
              <SelectTrigger className="min-w-[180px]">
                <SelectValue placeholder="Languages" />
              </SelectTrigger>
              <SelectContent id="language">
                <SelectGroup>
                  <SelectLabel>Language</SelectLabel>
                </SelectGroup>
                {languages?.map((language) => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="code">Code</Label>
          <Textarea
            name="code"
            id="code"
            className="h-60 resize-none"
            placeholder="console.log('Hello World!'');"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="description">Note/Description</Label>
          <Textarea
            name="description"
            id="description"
            className="h-20 resize-none"
            placeholder=""
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="tags">Tags</Label>
          <Input
            type="text"
            name="tags"
            id="tags"
            className="min-w-32"
            placeholder="e.g. React, JS, Vue"
          />
        </div>
        <div className="flex items-center gap-3 justify-end">
          <Link to="/snippets">
            <Button type="button" variant={"destructive"}>
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={createMutate.isPending}>
            {createMutate.isPending ? "Saving snippet..." : "Save Snippet"}
          </Button>
        </div>
      </form>
    </section>
  );
}
