import { useState } from "react";
import { Link } from "react-router-dom";
import { Blocks, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/auth";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const authNavLinks = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Snippets", href: "/snippets" },
  { name: "New Snippet", href: "/snippets/new" },
];

const resNavLinks = [
  { name: "Login", href: "/login" },
  { name: "Sign Up", href: "/register" },
];

export function Navbar() {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full py-2 px-3 sm:px-5 bg-secondary border-b">
      <div className="w-full sm:w-[90%] flex items-center justify-between mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <Blocks className="text-primary" />
          <span className="text-xl font-semibold">
            Snippet<strong className="text-primary">X</strong>
          </span>
        </Link>

        {/* Right Links */}
        <div className="hidden md:flex items-center gap-2">
          <Link to={"/"}>
            <Button variant={"link"} size={"sm"} className="text-foreground">
              Home
            </Button>
          </Link>
          {isAuthenticated ? (
            <>
              {authNavLinks.map((link) => (
                <Link to={link.href} key={link.href}>
                  <Button
                    variant={"link"}
                    size={"sm"}
                    className="text-foreground"
                  >
                    {link.name}
                  </Button>
                </Link>
              ))}
              <Button variant={"link"} size={"sm"} className="text-foreground">
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Link to={"/login"}>
                <Button
                  variant={"link"}
                  size={"sm"}
                  className="text-foreground"
                >
                  Login
                </Button>
              </Link>
              <Link to={"/register"}>
                <Button variant={"outline"} size={"sm"}>
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Menu">
                <Menu size={30} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="text-sm ">
              <div className="flex flex-col items-center space-y-3 mt-10">
                <Link to={"/"}>
                  <Button
                    variant={"link"}
                    size={"sm"}
                    className="text-foreground"
                  >
                    Home
                  </Button>
                </Link>
                {isAuthenticated ? (
                  <>
                    {authNavLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.href}
                        onClick={() => setOpen(false)}
                        className="font-medium transition"
                      >
                        <Button
                          variant={"link"}
                          size={"sm"}
                          className="text-foreground"
                        >
                          {link.name}
                        </Button>
                      </Link>
                    ))}
                    <Button
                      variant={"ghost"}
                      size={"sm"}
                      className="text-foreground"
                    >
                      Log Out
                    </Button>
                  </>
                ) : (
                  resNavLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setOpen(false)}
                      className="font-medium transition"
                    >
                      <Button
                        variant={"link"}
                        size={"sm"}
                        className="text-foreground"
                      >
                        {link.name}
                      </Button>
                    </Link>
                  ))
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
