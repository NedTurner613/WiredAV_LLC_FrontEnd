import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
// import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>
  //   e.preventDefault();
  // setIsLoading(true);
  // setError(null);

  // try {
  //   // Placeholder for Authenication (Supabase)
  //   const { data: authData, error: authError } =
  //     await supabase.auth.signInWithPassword({ email, password });

  //   if (authError || !authData.session) {
  //     throw new Error(authError?.message || "Invalid email or password.");
  //   }

  //   const token = authData.session.access_token;

  //   // Path is a placeholder for once Spring Security with JWT and OAuth2.0 has been set up
  //   const response = await fetch("http://localhost:8080/api/v1/auth/verify", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   if (!response.ok) {
  //     if (response.status === 403) {
  //       throw new Error("Access denied: You dont have permission to log in.");
  //     }
  //     throw new Error("Failed to verify authorization with backend server");
  //   }

  //   const authResult: AuthResponse = await response.json();

  //   if (!authResult.authorized) {
  //     throw new Error("Your account is not authorized to perform this action");
  //   }

  //   if (authResult.role === "ADMIN") {
  //     window.location.href = "/admin/dashboard";
  //   } else {
  //     window.location.href = "/dashboard";
  //   }
  // } catch {
  //   setError(
  //     err instanceof Error ? err.message : "An unexpected error occurred.",
  //   );
  // } finally {
  //   setIsLoading(false);
  // }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  // disabled={isLoading}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  // disabled={isLoading}
                  required
                />
              </Field>

              {/* {error && (
                <div className="text-sm font-medium text-red-500">{error}</div>
              )} */}

              <Field>
                <Button className="relative px-8 py-4 font-bold text-cyan-400 bg-slate-950 rounded-lg overflow-hidden group transition-all duration-300 hover:text-cyan-200 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    xmlns="http://w3.org"
                  >
                    <path
                      d="M 0 10 H 20 L 30 0 H 120 L 130 10 H 200 V 40 L 190 50 H 10 L 0 40 Z"
                      className="stroke-cyan-950 fill-none"
                      stroke-width="2"
                    />

                    <path
                      d="M 0 10 H 20 L 30 0 H 120 L 130 10 H 200 V 40 L 190 50 H 10 L 0 40 Z"
                      className="stroke-cyan-400 fill-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 [stroke-dasharray:40_20] [stroke-dashoffset:0] group-hover:animate-[circuit_2s_linear_infinite]"
                      stroke-width="2"
                    />
                  </svg>

                  <span className="absolute top-2 left-4 w-1 h-1 bg-cyan-500 rounded-full opacity-30 group-hover:opacity-100 group-hover:animate-ping"></span>
                  <span className="absolute bottom-2 right-4 w-1 h-1 bg-cyan-500 rounded-full opacity-30 group-hover:opacity-100 group-hover:animate-ping [animation-delay:0.5s]"></span>

                  <span className="relative z-10 flex items-center gap-3 tracking-wider uppercase text-sm">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
                    Submit
                  </span>
                </Button>

                {/* <Button variant="outline" type="button">
                  Login with Google
                </Button> */}
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
