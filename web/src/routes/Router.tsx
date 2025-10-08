import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard, Home, Login, Register, Snippet, Snippets } from "@/pages";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/snippets" element={<Snippets />} />
        <Route path="/snippets/:snippetId" element={<Snippet />} />
      </Routes>
    </BrowserRouter>
  );
}
