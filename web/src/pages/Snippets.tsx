import { Link } from "react-router-dom";
import { Braces, Plus, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { languages, tags } from "@/data";
import { useSnippet } from "@/hooks/useSnippet";
import type { SnippetCardType } from "@/types/snippet";
import { timeAgo } from "@/utils/timeAgo";
import { Loader } from "@/components";

export function Snippets() {
  const { getSnippetsQuery } = useSnippet();

  if (getSnippetsQuery.isPending) {
    return <Loader />;
  }

  return (
    <>
      {/* Header Section */}
      <section className="w-full py-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              All Snippets
            </h1>
            <p className="text-base font-normal text-foreground/60">
              Efficiently browse and manage your code snippet collection.
            </p>
          </div>
          <Link to={"/snippets/new"}>
            <Button>
              <Plus />
              <span>Create New Snippet</span>
            </Button>
          </Link>
        </div>
      </section>

      {/* Filter Section */}
      <section>
        <div className="mb-8 flex flex-wrap items-center gap-3 rounded-xl border bg-accent p-4">
          <label className="relative flex h-10 flex-1 items-center min-w-[200px]">
            <Search className="absolute left-3 text-foreground/50" size={20} />
            <Input
              placeholder="Search snippets by keyword..."
              type="search"
              className="indent-8"
            />
          </label>
          <div className="flex flex-wrap gap-3">
            <Select>
              <SelectTrigger className="max-w-[180px]">
                <SelectValue placeholder="Languages" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Language</SelectLabel>
                </SelectGroup>
                {languages?.map((language) => (
                  <SelectItem value={language}>{language}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="max-w-[180px]">
                <SelectValue placeholder="Tags" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tags</SelectLabel>
                </SelectGroup>
                {tags?.map((tag) => (
                  <SelectItem value={tag}>{tag}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Snippets  Section */}
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-5">
        {getSnippetsQuery.data?.snippets?.map((snippet: SnippetCardType) => (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-2 mb-1">
                <Braces className="text-primary" size={20} />
                <Badge variant={"outline"}>{snippet.language}</Badge>
              </div>
              <CardTitle className="line-clamp-2">{snippet.title}</CardTitle>
              <p className="text-foreground/80 line-clamp-2">
                {snippet.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {snippet.tags?.map((tag, index: number) => (
                  <Badge variant={"secondary"} key={index}>
                    {tag}
                  </Badge>
                ))}
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between">
                <p className="text-foreground/60 text-sm">
                  {timeAgo(snippet.updatedAt)}
                </p>
                <Link to={`/snippets/${snippet._id}`}>
                  <Button size={"sm"}>Open</Button>
                </Link>
              </div>
            </CardHeader>
          </Card>
        ))}
      </section>
    </>
  );
}
