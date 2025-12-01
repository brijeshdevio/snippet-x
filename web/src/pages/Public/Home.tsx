import { Link } from "react-router-dom";
import { features, steps } from "@/data";

export function Home() {
  return (
    <>
      {/* Header Section */}
      <header className="w-full min-h-[400px] h-[70vh] flex items-center justify-center">
        <div className="flex flex-col gap-5 text-center">
          <h1 className="text-4xl font-semibold">
            Save, Organize & Access <br /> Your Code Snippets <br />
            Effortlessly
          </h1>
          <p className="text-foreground/80">
            A modern, clean and developer-focused application to boost your
            productivity.
          </p>
          <div className="flex items-center justify-center gap-6">
            <Link to={"/dashboard"}>
              <button className="btn btn-primary">Get Started</button>
            </Link>

            <Link to={"/login"}>
              <button className="btn">Login</button>
            </Link>
          </div>
        </div>
      </header>

      {/* Why SnippetX Section */}
      <section className="w-full py-20">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Why SnippetsX</h2>
          <p className="text-foreground/80">
            Core features designed to streamline your development workflow.
          </p>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {features?.map((feature, index: number) => (
            <div key={index} className="card bg-base-100">
              <div className="card-body">
                <div className="bg-base-300 w-fit h-fit p-2 rounded-full ">
                  <feature.Icon size={25} className="text-primary" />
                </div>
                <h2 className="text-xl font-semibold">{feature.title}</h2>
                <p className="text-foreground/80">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Steps Section */}
      <section className="w-full py-20">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            Get Started in 3 Simple Steps
          </h2>
          <p className="text-foreground/80">
            Start organizing your code in minutes.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {steps?.map((step, index: number) => (
            <div key={index} className="flex flex-col gap-1 text-center">
              <div className="flex items-center justify-center bg-base-100 p-5 rounded-full w-8 h-8 mx-auto mb-2">
                <span className="text-xl text-primary">{step.step}</span>
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-foreground/80">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Get Started Section  */}
      <section className="w-full py-20 bg-base-100 rounded-2xl">
        <div className="text-center px-4">
          <h2 className="text-2xl font-semibold">
            Ready to Boost your Productivity
          </h2>
          <p className="text-foreground/80">
            Stop searching for the same code over and over. Start building your
            personal snippet library today.
          </p>
          <div className="mt-5">
            <Link to="/register">
              <button className="btn btn-primary">Sign up now for Free</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
