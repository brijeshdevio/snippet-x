import { Link } from "react-router-dom";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useLogin } from "@/hooks/useAuth";
import type { LoginType } from "@/types/auth";

const formFields = [
  {
    label: "Email ID",
    type: "email",
    name: "email",
    placeholder: "",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    placeholder: "",
  },
];

export function Login() {
  const { mutate, isPending } = useLogin();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    mutate(data as unknown as LoginType);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">Welcome back</CardTitle>
          <form className="flex flex-col gap-3 mt-3" onSubmit={handleSubmit}>
            {formFields?.map((form, index: number) => (
              <div className="flex flex-col gap-1" key={index + form.name}>
                <Label htmlFor={form.name}>{form.label}</Label>
                <Input
                  type={form.type}
                  name={form.name}
                  id={form.name}
                  placeholder={form.placeholder}
                />
              </div>
            ))}
            <div className="text-center">
              <Button className="w-2/3" disabled={isPending}>
                {isPending ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
          <Separator className="my-3" />
          <div className="text-center">
            <p>
              Don't have an account?{" "}
              <Link className="underline text-primary" to={"/register"}>
                Sign up
              </Link>
            </p>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
