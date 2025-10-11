import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout, BaseLayout } from "@/layouts";
import {
  Dashboard,
  Home,
  Login,
  NewSnippet,
  Register,
  Snippet,
  Snippets,
} from "@/pages";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Base Layout */}
        <Route element={<BaseLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/snippets" element={<Snippets />} />
          <Route path="/snippets/new" element={<NewSnippet />} />
          <Route path="/snippets/:snippetId" element={<Snippet />} />
        </Route>

        {/* Auth Layout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
