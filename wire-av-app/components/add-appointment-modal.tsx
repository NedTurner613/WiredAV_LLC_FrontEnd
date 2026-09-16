"use client";

import { useState, type FormEvent } from "react";
import { format } from "date-fns";
import { PlusIcon } from "lucide-react";

import {
  APPOINTMENT_STATUS_LABELS,
  APPOINTMENT_TYPE_LABELS,
  type AppointmentSelectOption,
} from "@/components/edit-appointment-modal";
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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type NewAppointmentValues = {
  clientInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  status: number;
  appType: number;
  timeslot: {
    startTime: string;
    endTime: string;
  };
  personnelId: number;
  createdAt: string | null;
};

type AddAppointmentModalProps = {
  personnelOptions: AppointmentSelectOption[];
  onAdd: (values: NewAppointmentValues) => Promise<void>;
};

function toLocalIso(date: string, time: string): string {
  if (!date || !time) return "";
  const parsed = new Date(`${date}T${time}:00`);
  return Number.isNaN(parsed.getTime())
    ? ""
    : format(parsed, "yyyy-MM-dd'T'HH:mm:ss");
}

export function AddAppointmentModal({
  personnelOptions,
  onAdd,
}: AddAppointmentModalProps) {
  const [open, setOpen] = useState(false);
  const [openSelects, setOpenSelects] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState("1");
  const [appType, setAppType] = useState("1");
  const [personnelId, setPersonnelId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setError(null);
      setStatus("1");
      setAppType("1");
      setPersonnelId("");
      setOpenSelects({});
    } else if (personnelOptions.length > 0) {
      setPersonnelId(personnelOptions[0].value);
    }
  };

  const selectedPersonnelId = personnelId || personnelOptions[0]?.value || "";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedPersonnelId) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phoneNumber = String(formData.get("phoneNumber") ?? "").trim();
    const date = String(formData.get("date") ?? "");
    const startTime = String(formData.get("startTime") ?? "");
    const endTime = String(formData.get("endTime") ?? "");

    if (!firstName || !lastName || !email || !phoneNumber) {
      setError("Please fill out the client details.");
      return;
    }

    const startIso = toLocalIso(date, startTime);
    const endIso = toLocalIso(date, endTime);
    if (!startIso || !endIso) {
      setError("Please enter a valid date and time range.");
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      await onAdd({
        clientInfo: {
          firstName,
          lastName,
          email,
          phoneNumber,
        },
        status: Number(status),
        appType: Number(appType),
        timeslot: {
          startTime: startIso,
          endTime: endIso,
        },
        personnelId: Number(selectedPersonnelId),
        createdAt: null,
      });
      form.reset();
      handleOpenChange(false);
    } catch {
      setError("Could not add the appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasPersonnel = personnelOptions.length > 0;
  const isAnySelectOpen = Object.values(openSelects).some(Boolean);

  const handleSelectOpenChange = (name: string, nextOpen: boolean) => {
    setOpenSelects((current) => {
      if (current[name] === nextOpen) return current;
      return { ...current, [name]: nextOpen };
    });
  };

  const handleDialogInteractOutside = (event: Event) => {
    if (isAnySelectOpen) {
      event.preventDefault();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-slate-200 bg-white text-slate-700 opacity-100 shadow-sm hover:bg-slate-50 hover:text-slate-900 aria-expanded:bg-slate-50 aria-expanded:text-slate-900 active:bg-slate-100 dark:border-slate-200 dark:bg-white dark:text-slate-700 dark:hover:bg-slate-50 dark:hover:text-slate-900 dark:aria-expanded:bg-slate-50 dark:aria-expanded:text-slate-900"
        >
          <PlusIcon />
          <span className="hidden lg:inline">Add Appointment</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="border-slate-200 bg-white text-slate-900 shadow-xl sm:max-w-lg"
        onInteractOutside={handleDialogInteractOutside}
        onPointerDownOutside={handleDialogInteractOutside}
        onFocusOutside={handleDialogInteractOutside}
      >
        <DialogHeader>
          <DialogTitle>Add Appointment</DialogTitle>
          <DialogDescription>
            Enter the appointment details below to add a new booking.
          </DialogDescription>
        </DialogHeader>

        {!hasPersonnel ? (
          <p className="text-sm text-red-600">
            Add at least one technician before creating an appointment.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="add-appointment-first-name">First Name</Label>
                <Input
                  id="add-appointment-first-name"
                  name="firstName"
                  placeholder="Jordan"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="add-appointment-last-name">Last Name</Label>
                <Input
                  id="add-appointment-last-name"
                  name="lastName"
                  placeholder="Ellis"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="add-appointment-email">Email</Label>
                <Input
                  id="add-appointment-email"
                  name="email"
                  type="email"
                  placeholder="client@example.com"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="add-appointment-phone">Phone</Label>
                <Input
                  id="add-appointment-phone"
                  name="phoneNumber"
                  type="tel"
                  placeholder="(555) 555-5555"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1 flex flex-col gap-2">
                <Label htmlFor="add-appointment-date">Date</Label>
                <Input
                  id="add-appointment-date"
                  name="date"
                  type="date"
                  required
                />
              </div>
              <div className="col-span-1 flex flex-col gap-2">
                <Label htmlFor="add-appointment-start">Start Time</Label>
                <Input
                  id="add-appointment-start"
                  name="startTime"
                  type="time"
                  required
                />
              </div>
              <div className="col-span-1 flex flex-col gap-2">
                <Label htmlFor="add-appointment-end">End Time</Label>
                <Input
                  id="add-appointment-end"
                  name="endTime"
                  type="time"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="add-appointment-personnel">Technician</Label>
                <Select
                  value={selectedPersonnelId}
                  onOpenChange={(nextOpen) =>
                    handleSelectOpenChange("personnel", nextOpen)
                  }
                  onValueChange={(value) => {
                    if (value !== null) setPersonnelId(value);
                  }}
                  items={personnelOptions}
                >
                  <SelectTrigger
                    id="add-appointment-personnel"
                    className="w-full border-slate-200 bg-white shadow-sm"
                  >
                    <SelectValue placeholder="Select a technician" />
                  </SelectTrigger>
                  <SelectContent side="bottom" align="start">
                    <SelectGroup>
                      {personnelOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="add-appointment-type">Type</Label>
                <Select
                  value={appType}
                  onOpenChange={(nextOpen) =>
                    handleSelectOpenChange("type", nextOpen)
                  }
                  onValueChange={(value) => {
                    if (value !== null) setAppType(value);
                  }}
                  items={Object.entries(APPOINTMENT_TYPE_LABELS).map(
                    ([value, label]) => ({ value, label }),
                  )}
                >
                  <SelectTrigger
                    id="add-appointment-type"
                    className="w-full border-slate-200 bg-white shadow-sm"
                  >
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent side="bottom" align="start">
                    <SelectGroup>
                      {Object.entries(APPOINTMENT_TYPE_LABELS).map(
                        ([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ),
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="add-appointment-status">Status</Label>
                <Select
                  value={status}
                  onOpenChange={(nextOpen) =>
                    handleSelectOpenChange("status", nextOpen)
                  }
                  onValueChange={(value) => {
                    if (value !== null) setStatus(value);
                  }}
                  items={Object.entries(APPOINTMENT_STATUS_LABELS).map(
                    ([value, label]) => ({ value, label }),
                  )}
                >
                  <SelectTrigger
                    id="add-appointment-status"
                    className="w-full border-slate-200 bg-white shadow-sm"
                  >
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent side="bottom" align="start">
                    <SelectGroup>
                      {Object.entries(APPOINTMENT_STATUS_LABELS).map(
                        ([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ),
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                onClick={() => handleOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Appointment"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
