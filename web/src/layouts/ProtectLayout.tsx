import { Outlet } from "react-router-dom";

export function ProtectLayout() {
  return (
    <>
      <main className="w-full sm:w-[90%] mx-auto py-5 px-3 sm:px-5">
        <Outlet />
      </main>
    </>
  );
}
