import { ThemeProvider } from "@/components";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-theme">
      <h1>Welcome to SnippetX</h1>
    </ThemeProvider>
  );
}

export default App;
