import { Braces, Clock, CodeXml, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
import type { StatCardProps } from "@/types";
import type { SnippetCardType } from "@/types/snippet";
import { timeAgo } from "@/utils/timeAgo";
import { Link } from "react-router-dom";
import { Loader } from "@/components";

function StatCard({ Icon, title, count }: StatCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex gap-3">
          <div>
            <div className="p-2 bg-primary/50 w-fit rounded">
              <Icon />
            </div>
          </div>
          <div>
            <h4 className="text-md text-foreground/80">{title}</h4>
            <h2 className="text-2xl font-semibold">{count}</h2>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export function Dashboard() {
  const { getSnippetStatsQuery: stats } = useSnippet();

  if (stats.isPending) {
    return <Loader />;
  }

  return (
    <>
      {/* Stats Section */}
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <StatCard
          Icon={CodeXml}
          title="Total Snippets"
          count={stats.data?.totalCount}
          key={"total-snippets"}
        />
        <StatCard
          Icon={Terminal}
          title="Language Count"
          count={stats.data?.languageCount}
          key={"language-count"}
        />
        <StatCard
          Icon={Clock}
          title="Recent Activity"
          count={stats.data?.recentActivity}
          key={"recent-activity"}
        />
      </section>

      {/* Snippets Filter Section */}
      <section className="w-full flex items-center gap-4 py-5">
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
      </section>

      {/* Snippets  Section */}
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-5">
        {stats.data?.recentSnippets?.map((snippet: SnippetCardType) => (
          <Card key={snippet._id}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Braces className="text-primary" size={20} />
                <CardTitle className="line-clamp-2">{snippet.title}</CardTitle>
              </div>
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
