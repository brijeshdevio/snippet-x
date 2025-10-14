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
import RestrictedRoute from "./RestrictedRoute";
import ProtectedRoute from "./ProtectedRoute";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Base Layout */}
        <Route element={<BaseLayout />}>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/snippets" element={<Snippets />} />
            <Route path="/snippets/new" element={<NewSnippet />} />
            <Route path="/snippets/:snippetId" element={<Snippet />} />
          </Route>
        </Route>

        {/* Auth Layout */}
        <Route element={<AuthLayout />}>
          <Route element={<RestrictedRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
