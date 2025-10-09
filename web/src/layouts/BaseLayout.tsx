import { Navbar } from "@/components";
import { Outlet } from "react-router-dom";

export function BaseLayout() {
  return (
    <>
      <Navbar />
      <main className="w-full sm:w-[90%] mx-auto py-5 px-3 sm:px-5">
        <Outlet />
      </main>
    </>
  );
}
