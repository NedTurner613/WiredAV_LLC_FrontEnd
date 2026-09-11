"use client";

import { useState, type FormEvent } from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type NewClientValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type AddClientModalProps = {
  onAdd: (values: NewClientValues) => Promise<void>;
};

export function AddClientModal({ onAdd }: AddClientModalProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values: NewClientValues = {
      firstName: String(formData.get("firstName") ?? "").trim(),
      lastName: String(formData.get("lastName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
    };
    setError(null);
    setIsSubmitting(true);
    try {
      await onAdd(values);
      event.currentTarget.reset();
      setOpen(false);
    } catch {
      setError("Could not add the client. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-slate-200 bg-white text-slate-700 opacity-100 shadow-sm hover:bg-slate-50 hover:text-slate-900 aria-expanded:bg-slate-50 aria-expanded:text-slate-900 active:bg-slate-100 dark:border-slate-200 dark:bg-white dark:text-slate-700 dark:hover:bg-slate-50 dark:hover:text-slate-900 dark:aria-expanded:bg-slate-50 dark:aria-expanded:text-slate-900"
        >
          <PlusIcon />
          <span className="hidden lg:inline">Add New Client</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="border-slate-200 bg-white text-slate-900 shadow-xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>
            Enter the details below to add a new client to the client list.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="add-client-first-name">First Name</Label>
              <Input
                id="add-client-first-name"
                name="firstName"
                placeholder="John"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="add-client-last-name">Last Name</Label>
              <Input
                id="add-client-last-name"
                name="lastName"
                placeholder="Doe"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="add-client-email">Email</Label>
            <Input
              id="add-client-email"
              name="email"
              type="email"
              placeholder="client@example.com"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="add-client-phone">Phone</Label>
            <Input
              id="add-client-phone"
              name="phone"
              type="tel"
              placeholder="(123) 456-7890"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Client"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
