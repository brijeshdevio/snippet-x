export function Footer() {
  return (
    <footer className="w-full px-3 py-4 bg-accent border-t">
      <div className="text-center">
        <p className="text-foreground/80">
          © {new Date().getFullYear()} SnippetX. All rights reserved.{" "}
        </p>
      </div>
    </footer>
  );
}
