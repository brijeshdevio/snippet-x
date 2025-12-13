export function Footer() {
  return (
    <footer className="w-full py-3 bg-base-100 border-t border-white/10">
      <div className="container mx-auto text-center text-sm opacity-70">
        <p>© {new Date().getFullYear()} SnippetX. All rights reserved.</p>
      </div>
    </footer>
  );
}
