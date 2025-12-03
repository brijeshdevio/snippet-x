import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "@/components";

export function ProtectLayout() {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="w-full pb-5 h-[calc(100vh-45px)] md:h-[calc(100vh-57px)] overflow-y-scroll">
          <Outlet />
        </main>
      </div>
    </>
  );
}
