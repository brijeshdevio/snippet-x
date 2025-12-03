import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout, BaseLayout, ProtectLayout } from "@/layouts";
import RestrictedRoute from "./RestrictedRoute";
import ProtectedRoute from "./ProtectedRoute";
import {
  Dashboard,
  EditSnippet,
  Home,
  Login,
  NewSnippet,
  PublicSnippets,
  Register,
  SingleSnippet,
  TrashSnippets,
} from "@/pages";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/public" element={<PublicSnippets />} />
        </Route>

        <Route element={<RestrictedRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new" element={<NewSnippet />} />
            <Route path="/trash" element={<TrashSnippets />} />
            <Route path="/snippets/:SNIPPET_ID" element={<SingleSnippet />} />
            <Route
              path="/snippets/:SNIPPET_ID/edit"
              element={<EditSnippet />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
