import { Link } from "react-router-dom";
import { Blocks, Menu, Search, X } from "lucide-react";
import { useAuth } from "@/auth";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleMenuToggle = () => {
    setIsMenuOpen((pre) => !pre);
  };

  return (
    <nav className="relative w-full px-3 py-2 sm:px-5 border-b border-white/5 bg-base-100 z-70">
      <div className="w-full sm:w-[95%] flex items-center gap-5 mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 logo">
          <Blocks className="text-primary" />
          <span className="text-xl font-semibold hidden sm:block">
            Snippet<strong className="text-primary">X</strong>
          </span>
        </Link>

        <form className="w-full md:hidden">
          <label className="input min-w-full">
            <Search size={20} className="opacity-70" />
            <input type="text" placeholder="Search public snippets..." />
          </label>
        </form>

        <div className="ml-auto md:hidden">
          <button className="btn btn-sm btn-ghost" onClick={handleMenuToggle}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div
          className={`absolute top-[57px] left-0 w-full ${
            isMenuOpen ? "flex" : "hidden"
          }  md:hidden flex-col gap-2  p-3 bg-base-100 border-b border-white/5 shadow`}
        >
          <Link
            to="/dashboard"
            className="btn btn-sm w-full flex items-center justify-start"
          >
            Dashboard
          </Link>
          <Link
            to="/"
            className="btn btn-sm btn-ghost w-full flex items-center justify-start"
          >
            Home
          </Link>
          <button className="btn btn-primary btn-sm  flex items-center justify-start">
            Logout
          </button>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/dashboard" className="btn btn-sm">
            Dashboard
          </Link>
          <Link to="/" className="btn btn-ghost btn-sm">
            Home
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3 ml-auto">
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
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
              <Link to="/login" className="btn btn-ghost btn-sm">
                Log in
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
