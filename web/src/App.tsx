import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components";
import { AuthProvider } from "@/auth";
import { Router } from "@/routes";
import "@/App.css";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-theme">
        <QueryClientProvider client={new QueryClient()}>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
      <Toaster />
    </>
  );
}

export default App;
