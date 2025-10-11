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

export function NewSnippet() {
  return (
    <section className="w-full flex flex-col gap-4 py-5">
      <div>
        <h2 className="text-2xl">Create New Snippet</h2>
      </div>
      <form className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Label>Title</Label>
            <Input placeholder="e.g., JavaScript Hello World" />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Select Language</Label>
            <Select>
              <SelectTrigger className="min-w-[180px]">
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
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Label>Code</Label>
          <Textarea
            className="h-60 resize-none"
            placeholder="console.log('Hello World!'');"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Note/Description</Label>
          <Textarea className="h-20 resize-none" placeholder="" />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Tags</Label>
          <Input className="min-w-32" placeholder="e.g. React, JS, Vue" />
        </div>
        <div className="flex items-center gap-3 justify-end">
          <Link to="/snippets">
            <Button type="button" variant={"destructive"}>
              Cancel
            </Button>
          </Link>
          <Button type="submit">Save Snippet</Button>
        </div>
      </form>
    </section>
  );
}
