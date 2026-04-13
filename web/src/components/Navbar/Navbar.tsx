import { Link } from "react-router-dom";
import { Blocks, Menu, X } from "lucide-react";
import { useAuth } from "@/auth";
import { useState } from "react";
import { useLogout } from "@/hooks/useAuth";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mutate, isPending } = useLogout();
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
          <span className="text-xl font-semibold">
            Snippet<strong className="text-primary">X</strong>
          </span>
        </Link>

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

          {isAuthenticated ? (
            <>
              <button
                className="btn btn-primary btn-sm  flex items-center justify-start"
                disabled={isPending}
                onClick={() => mutate()}
              >
                {isPending ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Logout"
                )}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="btn btn-sm btn-primary w-full flex items-center justify-start"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="btn btn-sm btn-ghost w-full flex items-center justify-start"
              >
                Log in
              </Link>
            </>
          )}
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
          {isAuthenticated ? (
            <>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => mutate()}
                disabled={isPending}
              >
                {isPending ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Logout"
                )}
              </button>
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
