import { Spinner } from "./ui/spinner";

export function Loader() {
  return (
    <div className="w-full min-h-[300px] h-[calc(100vh-150px)] flex items-center justify-center">
      <div className="text-center">
        <Spinner className="size-8 mx-auto mb-2" />
        <span className="text-foreground/70">Loading...</span>
      </div>
    </div>
  );
}
