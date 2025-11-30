import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider } from "@/auth";
import { Router } from "@/routes";
import "@/App.css";

function App() {
  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </QueryClientProvider>

      <Toaster />
    </>
  );
}

export default App;
