import { Link } from "react-router-dom";
import { Blocks } from "lucide-react";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <nav className="w-full py-2 px-3 sm:px-5 bg-secondary">
      <div className="w-full sm:w-[90%] flex items-center justify-between mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <Blocks className="text-primary" />
          <span className="text-xl font-semibold">
            Snippet<strong className="text-primary">X</strong>
          </span>
        </Link>

        {/* Right Links */}
        <div className="flex items-center gap-2">
          <Link to={"/"}>
            <Button variant={"link"} size={"sm"} className="text-foreground">
              Home
            </Button>
          </Link>
          <Link to={"/login"}>
            <Button variant={"link"} size={"sm"} className="text-foreground">
              Login
            </Button>
          </Link>
          <Link to={"/register"}>
            <Button variant={"outline"} size={"sm"}>
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
