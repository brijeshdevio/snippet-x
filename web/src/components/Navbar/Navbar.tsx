import { Link } from "react-router-dom";
import { Blocks, Search } from "lucide-react";
import { useAuth } from "@/auth";

export function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="w-full px-3 py-2 sm:px-5 border-b border-white/5 bg-base-100">
      <div className="w-full sm:w-[95%] flex items-center gap-5 mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 logo">
          <Blocks className="text-primary" />
          <span className="text-xl font-semibold">
            Snippet<strong className="text-primary">X</strong>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="btn btn-sm">
            Dashboard
          </Link>
          <Link to="/" className="btn btn-ghost btn-sm">
            Home
          </Link>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <form>
            <label className="input min-w-[300px]">
              <Search size={20} className="opacity-70" />
              <input type="text" placeholder="Search public snippets..." />
            </label>
          </form>
          {isAuthenticated ? (
            <>
              <button className="btn btn-primary btn-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="btn btn-primary btn-sm">
                Register
              </Link>
              <Link to="/dashboard" className="btn btn-ghost btn-sm">
                Log in
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
