import { Link } from "react-router-dom";
import { Blocks } from "lucide-react";
import { useRegister } from "@/hooks/useAuth";
import type { FormEvent } from "react";
import type { RegisterType } from "@/types/auth";

const formFields = [
  {
    label: "Full Name",
    type: "text",
    name: "name",
    placeholder: "Enter your full name",
  },
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

export function Register() {
  const { mutate, isPending } = useRegister();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    mutate(data as unknown as RegisterType);
  };

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
            <h1 className="text-2xl text-center">Create an Account</h1>
            <p className="opacity-70 text-sm text-center">
              Sign up for an account
            </p>
          </div>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
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
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isPending}
            >
              {isPending ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Register"
              )}
            </button>
          </form>
          <div className="text-center">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-primary">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
