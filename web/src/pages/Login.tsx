import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export function Login() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">Welcome back</CardTitle>
          <form className="flex flex-col gap-3 mt-3">
            <div className="flex flex-col gap-1">
              <Label>Email Address</Label>
              <Input placeholder="jasmine.doe@example.com" />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Password</Label>
              <Input placeholder="*********" />
            </div>
            <div className="text-center">
              <Button className="w-2/3">Log in</Button>
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
