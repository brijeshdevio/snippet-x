import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <>
      <main className="w-full h-screen flex items-center justify-center px-3">
        <section className="w-[350px]">
          <Outlet />
        </section>
      </main>
    </>
  );
}
