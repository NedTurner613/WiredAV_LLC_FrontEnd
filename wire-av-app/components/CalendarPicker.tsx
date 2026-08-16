"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function CalendarPicker() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  // const appointments = useAppointments(date);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_40px] items-start rounded-lg p-4">
      <div className="flex flex-col gap-3 min-w-0">
        <h2 className="text-sm font-medium">Upcoming Appointments</h2>
        <div className="flex flex-col divide-y divide-border">
          {date ? format(date, "PPP") : "No date selected"}
        </div>
        <div className="max-h-[400px] overflow-y-auto flex flex-col gap-2 pr-1">
          <ul>
            <li>Appointment 1: Joe Down Aug 10th</li>
            <li>Appointment 2: Joe Down Aug 11th</li>
            <li>Appointment 3: Joe Down Aug 12th</li>
            <li>Appointment 4: Joe Down Aug 13th</li>
            <li>Appointment 5: Joe Down Aug 14th</li>
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

      <div className="sticky top-4 flex flex-col gap-4 w-full md:w-[340px]">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border w-full"
          classNames={{ root: "w-full" }}
          captionLayout="dropdown"
        />
      </div>
    </div>
  );
}
