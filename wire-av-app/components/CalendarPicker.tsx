"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  APPOINTMENT_STATUS_LABELS,
  APPOINTMENT_TYPE_LABELS,
  useAppointments,
  type AppointmentEntry,
} from "@/hooks/useAppointments";

const statusChipClasses: Record<number, string> = {
  1: "border-amber-200 bg-amber-50 text-amber-700",
  2: "border-sky-200 bg-sky-50 text-sky-700",
  3: "border-slate-200 bg-slate-100 text-slate-500",
};

function getStatusChipClass(status: number): string {
  return (
    statusChipClasses[status] ??
    "border-slate-200 bg-slate-100 text-slate-500"
  );
}

function AppointmentItem({ appointment }: { appointment: AppointmentEntry }) {
  const start = new Date(appointment.timeslot.startTime);
  const end = new Date(appointment.timeslot.endTime);

  const clientName = appointment.clientInfo
    ? `${appointment.clientInfo.firstName} ${appointment.clientInfo.lastName}`
    : "Unknown client";

  const personnelName = appointment.personnelInfo
    ? `${appointment.personnelInfo.firstName} ${appointment.personnelInfo.lastName}`
    : "Unassigned";

  const statusLabel =
    APPOINTMENT_STATUS_LABELS[appointment.status] ??
    `Status ${appointment.status}`;

  const typeLabel = APPOINTMENT_TYPE_LABELS[appointment.apptType];

  return (
    <li className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-100">
      <div className="flex items-center justify-between gap-2">
        <span className="truncate font-medium text-slate-900">
          {clientName}
        </span>
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium ${getStatusChipClass(appointment.status)}`}
        >
          {statusLabel}
        </span>
      </div>
      <div className="mt-1 flex flex-wrap items-center gap-x-1.5 text-xs text-slate-500">
        {typeLabel && <span>{typeLabel}</span>}
        <span>{format(start, "EEE, MMM d")}</span>
        <span aria-hidden="true">·</span>
        <span>
          {format(start, "h:mm a")} – {format(end, "h:mm a")}
        </span>
        <span aria-hidden="true">·</span>
        <span>{personnelName}</span>
      </div>
    </li>
  );
}

export default function CalendarPicker() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { appointments, loading, error, refetch } = useAppointments(date);

  return (
    <div className="grid w-full grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.4fr)_420px]">
      <div className="min-w-0 rounded-xl border border-slate-200/70 bg-white p-4 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">
          Upcoming Appointments
        </h2>
        <div className="mt-2 inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-800">
          {date ? format(date, "PPP") : "No date selected"}
        </div>
        <div className="mt-4 max-h-105 space-y-2 overflow-y-auto pr-1">
          {appointments && appointments.length > 0 ? (
            <ul className="space-y-2">
              {appointments.map((appointment) => (
                <AppointmentItem
                  key={appointment.apptId}
                  appointment={appointment}
                />
              ))}
            </ul>
          ) : loading ? (
            <p className="text-sm text-slate-500">Loading appointments...</p>
          ) : error ? (
            <p className="text-sm text-red-600">
              Couldn&apos;t load appointments: {error.message}
              <button
                onClick={() => void refetch()}
                className="ml-2 font-medium underline underline-offset-2"
              >
                Retry
              </button>
            </p>
          ) : (
            <p className="text-sm text-slate-500">
              No appointments{" "}
              {date
                ? `scheduled for ${format(date, "EEE, MMM d")}`
                : "scheduled this week"}
              .
            </p>
          )}
        </div>
      </div>

      <div className="w-full rounded-xl border border-slate-200/70 bg-white p-3 shadow-sm lg:w-105">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="w-full rounded-lg border border-slate-200"
          classNames={{ root: "w-full" }}
          captionLayout="dropdown"
        />
      </div>
    </div>
  );
}
