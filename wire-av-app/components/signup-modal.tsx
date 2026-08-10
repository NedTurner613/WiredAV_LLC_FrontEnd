"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SignupForm } from "@/components/signup-form";

export function SignupModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Sign Up</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register Personnel</DialogTitle>
          <DialogDescription>
            Enter the first name, last name, email, and phone number to register
            the technician.
          </DialogDescription>
        </DialogHeader>
        <SignupForm />
      </DialogContent>
    </Dialog>
  );
}
