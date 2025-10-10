import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export function Register() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Create an account
          </CardTitle>
          <form className="flex flex-col gap-3 mt-3">
            <div className="flex flex-col gap-1">
              <Label>Full Name</Label>
              <Input placeholder="Jasmine Doe" />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Email Address</Label>
              <Input placeholder="jasmine.doe@example.com" />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Password</Label>
              <Input placeholder="*********" />
            </div>
            <div className="text-center">
              <Button>Create an Account</Button>
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
