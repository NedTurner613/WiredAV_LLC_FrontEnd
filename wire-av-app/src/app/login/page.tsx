import { LoginForm } from "@/components/login-form";
import Image from "next/image";
import logo from "@/src/app/images/wiredlogo1.png";

export default function LoginPage() {
  return (
    <div>
      <div className="flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10">
        <Image
          src={logo}
          alt="Wired! Audio Video Logo"
          width={120}
          height={120}
          className="h-30 w-30 object-contain mb-6"
          priority
        />
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
