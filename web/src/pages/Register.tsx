import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRegister } from "@/hooks/useAuth";
import type { RegisterType } from "@/types/auth";

const formFields = [
  {
    label: "Full Name",
    type: "text",
    name: "name",
    placeholder: "",
  },
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

export function Register() {
  const { mutate, isPending } = useRegister();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    mutate(data as unknown as RegisterType);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Create an account
          </CardTitle>
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
              <Button disabled={isPending} type="submit">
                {isPending ? "Loading..." : "Create an Account"}
              </Button>
            </div>
          </form>
          <Separator className="my-3" />
          <div className="text-center">
            <p>
              Already have an account?{" "}
              <Link className="underline text-primary" to={"/login"}>
                Log in
              </Link>
            </p>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
