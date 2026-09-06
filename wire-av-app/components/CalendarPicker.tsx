"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function CalendarPicker() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  // const appointments = useAppointments(date);
  const appointments = [
    "Appointment 1: Joe Down Aug 10th",
    "Appointment 2: Joe Down Aug 11th",
    "Appointment 3: Joe Down Aug 12th",
    "Appointment 4: Joe Down Aug 13th",
    "Appointment 5: Joe Down Aug 14th",
  ];

  return (
    <div className="grid w-full grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.4fr)_420px]">
      <div className="min-w-0 rounded-xl border border-slate-200/70 bg-white p-4 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Upcoming Appointments</h2>
        <div className="mt-2 inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-800">
          {date ? format(date, "PPP") : "No date selected"}
        </div>
        <div className="mt-4 max-h-105 space-y-2 overflow-y-auto pr-1">
          <ul className="space-y-2">
            {appointments.map((appointment) => (
              <li
                key={appointment}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-100"
              >
                {appointment}
              </li>
            ))}
          </ul>
          {/* {appointments.length === 0 ? (
            <p className="text-sm text-muted-foreground">No appointments</p>
          ) : (
            appointments.map((a) => (
              <div
                key={a.id}
                className="text-sm flex justify-between border-b pb-2 last:border-0"
              >
                <span>{a.title}</span>
                <span className="text-muted-foreground">{a.time}</span>
              </div>
            ))
          )} */}
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
