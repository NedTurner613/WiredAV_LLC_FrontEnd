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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type NewPersonnelValues = {
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "technician";
};

type AddPersonnelModalProps = {
  onAdd: (values: NewPersonnelValues) => Promise<void>;
};

type PersonnelRole = "admin" | "technician";

export function AddPersonnelModal({ onAdd }: AddPersonnelModalProps) {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<PersonnelRole>("technician");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values: NewPersonnelValues = {
      firstName: String(formData.get("firstName") ?? "").trim(),
      lastName: String(formData.get("lastName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      role,
    };
    setError(null);
    setIsSubmitting(true);
    try {
      await onAdd(values);
      setRole("technician");
      event.currentTarget.reset();
      setOpen(false);
    } catch {
      setError("Could not add the personnel. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PlusIcon />
          <span className="hidden lg:inline">Add New Personnel</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Personnel</DialogTitle>
          <DialogDescription>
            Enter the details below to add a new member to the personnel list.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="add-personnel-first-name">First Name</Label>
              <Input
                id="add-personnel-first-name"
                name="firstName"
                placeholder="John"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="add-personnel-last-name">Last Name</Label>
              <Input
                id="add-personnel-last-name"
                name="lastName"
                placeholder="Doe"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="add-personnel-email">Email</Label>
            <Input
              id="add-personnel-email"
              name="email"
              type="email"
              placeholder="member@example.com"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="add-personnel-role">Role</Label>
            <Select value={role} onValueChange={(value) => setRole(value as PersonnelRole)}>
              <SelectTrigger id="add-personnel-role" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="technician">Technician</SelectItem>
              </SelectContent>
            </Select>
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
              {isSubmitting ? "Adding..." : "Add Personnel"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
