import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "@/components";

export function ProtectLayout() {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="w-full sm:w-[90%] mx-auto py-5 px-3 sm:px-5">
          <Outlet />
        </main>
      </div>
    </>
  );
}
