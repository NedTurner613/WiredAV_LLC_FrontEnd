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
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginAction } from "@/lib/auth-actions";

export async function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/admin");
  }

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
          <form action={loginAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@example.com"
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
                <Input id="password" name="password" type="password" required />
              </Field>

              <Field>
                <Button
                  className="relative px-8 py-4 font-bold text-cyan-400 bg-slate-950 rounded-lg overflow-hidden group transition-all duration-300 hover:text-cyan-200 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                  type="submit"
                >
                  Login
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M 0 10 H 20 L 30 0 H 120 L 130 10 H 200 V 40 L 190 50 H 10 L 0 40 Z"
                      className="stroke-cyan-950 fill-none"
                      strokeWidth="2"
                    />

                    <path
                      d="M 0 10 H 20 L 30 0 H 120 L 130 10 H 200 V 40 L 190 50 H 10 L 0 40 Z"
                      className="stroke-cyan-400 fill-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 [stroke-dasharray:40_20] [stroke-dashoffset:0] group-hover:animate-[circuit_2s_linear_infinite]"
                      strokeWidth="2"
                    />
                  </svg>
                  <span className="absolute top-2 left-4 w-1 h-1 bg-cyan-500 rounded-full opacity-30 group-hover:opacity-100 group-hover:animate-ping"></span>
                  <span className="absolute bottom-2 right-4 w-1 h-1 bg-cyan-500 rounded-full opacity-30 group-hover:opacity-100 group-hover:animate-ping [animation-delay:0.5s]"></span>
                  <span className="relative z-10 flex items-center gap-3 tracking-wider uppercase text-sm">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
                    Submit
                  </span>
                </Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/signup">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
