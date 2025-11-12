import { Copy, Pen, Trash2 } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { anOldHope as codeTheme } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { snippet } from "@/data";

export function Snippet() {
  return (
    <>
      <section className="flex flex-col gap-3 py-5">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold tracking-tight md:text-3xl">
            {snippet.title}
          </h1>
          <p className="font-normal text-foreground/60 text-sm">
            Last updated: {snippet.updated}
          </p>
        </div>
        <div className="flex flex-wrap justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {snippet.tags?.map((tag, index: number) => (
              <>
                <Badge key={index} variant={"secondary"}>
                  {tag}
                </Badge>
              </>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size={"sm"}>
              <Pen />
              <span>Edit</span>
            </Button>
            <Button variant={"outline"} size={"sm"}>
              <Copy />
            </Button>
            <Button variant={"destructive"} size={"sm"}>
              <Trash2 />
            </Button>
          </div>
        </div>
        <div className="rounded overflow-hidden border text-sm">
          <SyntaxHighlighter language="javascript" style={codeTheme}>
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
