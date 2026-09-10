"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { format, isBefore, startOfDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
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
import { apiClient } from "@/src/app/services/apiClient";
import { toast } from "sonner";
import { ConsultationRequest } from "@/src/types";

const SERVICES = [
  "Structured Pre-Wire",
  "Home Cinema & Audio",
  "Luxury Home Integration",
  "Small Business Integration",
  "Commercial & Business Tech",
  "New Construction Framework",
  "Smart Home Automation",
  "Network & Security",
] as const;

const WEEKDAY_SLOTS = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
];

const SATURDAY_SLOTS = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
];

const fieldClassName =
  "h-11 rounded-xl border-[#D2D7E1] bg-white text-[#0F172A] placeholder:text-[#939AAA] focus-visible:border-[#2563EB] focus-visible:ring-[#2563EB]/20";

function slotToDate(date: Date, slot: string) {
  const [time, meridiem] = slot.split(" ");
  const [hoursStr, minutesStr] = time.split(":");
  let hours = Number(hoursStr);
  const minutes = Number(minutesStr);
  if (meridiem === "PM" && hours !== 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;
  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  return result;
}

function getTimeSlots(date: Date | undefined) {
  if (!date) return [];
  const day = date.getDay();
  if (day === 0) return [];
  const slots = day === 6 ? SATURDAY_SLOTS : WEEKDAY_SLOTS;
  const now = new Date();
  return slots.filter((slot) => slotToDate(date, slot) > now);
}

type ConsultationModalProps = {
  children: ReactNode;
};

export function ConsultationModal({ children }: ConsultationModalProps) {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  // const [service, setService] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeslot, setTimeSlot] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const timeSlots = useMemo(() => getTimeSlots(date), [date]);

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    // setService(null);
    setDate(undefined);
    setTimeSlot(null);
    setSubmitted(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) resetForm();
  };

  const handleDateSelect = (nextDate: Date | undefined) => {
    setDate(nextDate);
    setTimeSlot(null);
  };

  const canSubmit =
    firstName.trim() &&
    lastName.trim() &&
    email.trim() &&
    // service &&
    date &&
    timeslot;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    apiClient.post<ConsultationRequest>("api/v1/consultations", {
      clientInfo: { firstName, lastName, email, phoneNumber: phone },
      timeslot: {
        startTime: slotToDate(date!, timeslot!).toISOString(),
        endTime: slotToDate(date!, timeslot!).toISOString(),
      },
    });
    event.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
    resetForm();
    handleOpenChange(false);
    toast.success("Thank you for your request! We will get back to you soon.");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-[#D2D7E1] bg-[#F3F7FE] p-6 text-[#0F172A] sm:max-w-[880px] sm:rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            Schedule a Consultation
          </DialogTitle>
          <DialogDescription className="text-[#596275]">
            Share a few details and pick a time that works. We typically respond
            within one business day.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="rounded-xl border border-[#2563EB]/20 bg-white p-8 text-center">
            <p className="text-lg font-semibold text-[#0F172A]">
              Your consultation request is in.
            </p>
            <p className="mt-2 text-sm text-[#596275]">
              We&apos;ll confirm {timeslot} on {date ? format(date, "PPP") : ""}{" "}
              {/* for {service}. */}
            </p>
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="mt-6 bg-[#2563EB] px-6 py-2.5 text-sm font-semibold text-[#F2F7FF] rounded-full shadow-md transition-all hover:bg-[#1D4ED8]"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="consultation-first-name">First name</Label>
                  <Input
                    id="consultation-first-name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    placeholder="Jordan"
                    required
                    className={fieldClassName}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="consultation-last-name">Last name</Label>
                  <Input
                    id="consultation-last-name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    placeholder="Ellis"
                    required
                    className={fieldClassName}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="consultation-phone">Phone</Label>
                  <Input
                    id="consultation-phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="(555) 555-5555"
                    required
                    className={fieldClassName}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="consultation-email">Email</Label>
                <Input
                  id="consultation-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                  className={fieldClassName}
                />
              </div>

              {/* <div className="flex flex-col gap-2">
                <Label htmlFor="consultation-service">Service</Label>
                <Select
                  value={service}
                  onValueChange={(value) => {
                    if (value !== null) setService(value);
                  }}
                >
                  <SelectTrigger
                    id="consultation-service"
                    className={`${fieldClassName} w-full justify-between px-3`}
                  >
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="z-[80] rounded-xl">
                    {SERVICES.map((item) => (
                      <SelectItem key={item} value={item} className="rounded-lg">
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> */}

              <div className="mt-auto hidden rounded-xl border border-[#2563EB]/15 bg-[#2563EB]/5 p-4 text-xs leading-relaxed text-[#596275] md:block">
                Office hours are Monday–Friday 9:00 AM–6:00 PM and Saturday
                10:00 AM–2:00 PM. Sundays are unavailable.
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-xl border border-[#D2D7E1]/60 bg-white p-4">
              <div>
                <p className="text-sm font-medium">Choose a date</p>
                <p className="text-xs text-[#596275]">
                  {date
                    ? format(date, "EEEE, MMMM d")
                    : "Select a day to see times"}
                </p>
              </div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                disabled={(calendarDate) =>
                  calendarDate.getDay() === 0 ||
                  isBefore(startOfDay(calendarDate), startOfDay(new Date()))
                }
                className="w-full rounded-xl border border-[#D2D7E1] bg-[#F3F7FE]"
                classNames={{ root: "w-full" }}
              />

              <div>
                <p className="mb-2 text-sm font-medium">Available times</p>
                {!date ? (
                  <p className="text-sm text-[#596275]">
                    Pick a date to view time slots.
                  </p>
                ) : timeSlots.length === 0 ? (
                  <p className="text-sm text-[#596275]">
                    No remaining times for this day. Please choose another date.
                  </p>
                ) : (
                  <div className="grid max-h-44 grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3">
                    {timeSlots.map((slot) => {
                      const isSelected = timeslot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTimeSlot(slot)}
                          className={
                            isSelected
                              ? "rounded-full bg-[#2563EB] px-3 py-2 text-xs font-semibold text-[#F2F7FF] shadow-sm"
                              : "rounded-full border border-[#D2D7E1] bg-[#F3F7FE] px-3 py-2 text-xs font-medium text-[#0F172A] transition-colors hover:border-[#2563EB] hover:text-[#2563EB]"
                          }
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => handleOpenChange(false)}
                className="rounded-full border border-[#D2D7E1] px-6 py-2.5 text-sm font-semibold text-[#0F172A] transition-all hover:bg-black/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!canSubmit}
                className="rounded-full bg-[#2563EB] px-6 py-2.5 text-sm font-semibold text-[#F2F7FF] shadow-md transition-all hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Request Consultation
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
