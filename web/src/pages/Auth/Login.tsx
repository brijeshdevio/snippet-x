import { Link } from "react-router-dom";
import { Blocks } from "lucide-react";

const formFields = [
  {
    label: "Email Address",
    type: "email",
    name: "email",
    placeholder: "Enter your email address",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    placeholder: "***********",
  },
];

export function Login() {
  return (
    <section className="w-full max-w-[350px]">
      <div>
        <div className="p-3 rounded-2xl bg-base-100 w-fit mx-auto">
          <Link to={"/"}>
            <Blocks size={30} className="text-primary" />
          </Link>
        </div>
        <h2 className="mt-2 text-center text-2xl">
          Snippet<strong className="text-primary">X</strong>
        </h2>
      </div>
      <div className="w-full mt-4 card bg-base-100">
        <div className="card-body flex flex-col gap-5">
          <div>
            <h1 className="text-2xl text-center">Welcome back!</h1>
            <p className="opacity-70 text-sm text-center">
              Log in to your account
            </p>
          </div>
          <form className="flex flex-col gap-3">
            {formFields?.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  placeholder={field.placeholder}
                  required
                  className="input input-bordered w-full"
                />
              </div>
            ))}
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
          <div className="text-center">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="text-primary">
                Start for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
