import { ThemeProvider } from "@/components";
import { Router } from "@/routes";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-theme">
      <Router />
    </ThemeProvider>
  );
}

export default App;
