import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signupAction } from "@/lib/auth-actions";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Register Personnel</CardTitle>
          <CardDescription>
            Enter the first name, last name, email, phone number, and password
            to register the technician.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signupAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="John"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="phoneNumber">Phone Number</FieldLabel>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="(123)-456-7890"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  required
                />
              </Field>

              <Field>
                <Button
                  type="submit"
                  className="relative px-8 py-4 font-bold text-cyan-400 bg-slate-950 rounded-lg overflow-hidden group transition-all duration-300 hover:text-cyan-200 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                >
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
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
