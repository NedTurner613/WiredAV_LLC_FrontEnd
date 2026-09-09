"use client";

import { useEffect, useState } from "react";
import { endOfDay, endOfWeek, format, startOfDay, startOfWeek } from "date-fns";
import { apiClient } from "@/src/app/services/apiClient";

export interface AppointmentClientInfo {
  clientId: number;
  firstName: string;
  lastName: string;
}

export interface AppointmentPersonnelInfo {
  personnelId: number;
  firstName: string;
  lastName: string;
}

export interface AppointmentTimeslot {
  timeslotId: number;
  startTime: string;
  endTime: string;
}

export interface AppointmentEntry {
  apptId: number;
  status: number;
  clientInfo: AppointmentClientInfo;
  personnelInfo: AppointmentPersonnelInfo | null;
  timeslot: AppointmentTimeslot;
  apptType: number;
}

export const APPOINTMENT_STATUS_LABELS: Record<number, string> = {
  1: "Requested",
  2: "Open",
  3: "Closed",
};

export const APPOINTMENT_TYPE_LABELS: Record<number, string> = {
  1: "Consultation",
};

const APPOINTMENTS_URL = "/api/appointments/list";
const PERSONNEL_URL = "/api/v1/personnel";

const toLocalIso = (date: Date) => format(date, "yyyy-MM-dd'T'HH:mm:ss");

/**
 * The time window to fetch appointments for.
 * When no date is selected, the current week (Sunday through Saturday,
 * matching the calendar grid). When a date is selected, that single day.
 */
function getTimeWindow(selectedDate: Date | undefined): {
  start: Date;
  end: Date;
} {
  if (selectedDate) {
    return { start: startOfDay(selectedDate), end: endOfDay(selectedDate) };
  }
  const today = new Date();
  return { start: startOfWeek(today), end: endOfWeek(today) };
}

interface GetAppointmentsListResponse {
  appointments: AppointmentEntry[];
}

interface GetAppointmentsListRequest {
  personnelIds: number[];
  timeFrame: { startTime: string; endTime: string };
}

let allPersonnelIdsPromise: Promise<number[]> | null = null;

async function fetchAllPersonnelIds(): Promise<number[]> {
  const payload = await apiClient.get<
    | Array<{ personnelId?: number; id?: number }>
    | { personnelList?: Array<{ personnelId?: number; id?: number }> }
  >(PERSONNEL_URL);

  const rows = Array.isArray(payload) ? payload : payload?.personnelList ?? [];

  return rows
    .map((person) => person?.personnelId ?? person?.id)
    .filter((personnelId): personnelId is number =>
      typeof personnelId === "number",
    );
}

function getAllPersonnelIds(): Promise<number[]> {
  if (!allPersonnelIdsPromise) {
    allPersonnelIdsPromise = fetchAllPersonnelIds().catch((error) => {
      allPersonnelIdsPromise = null;
      throw error;
    });
  }
  return allPersonnelIdsPromise;
}

async function fetchAppointments(
  selectedDate: Date | undefined,
): Promise<AppointmentEntry[]> {
  const { start, end } = getTimeWindow(selectedDate);
  const personnelIds = await getAllPersonnelIds();

  const payload = await apiClient.post<
    GetAppointmentsListResponse | AppointmentEntry[],
    GetAppointmentsListRequest
  >(APPOINTMENTS_URL, {
    personnelIds,
    timeFrame: { startTime: toLocalIso(start), endTime: toLocalIso(end) },
  });

  const entries = Array.isArray(payload) ? payload : payload.appointments;

  const startMs = start.getTime();
  const endMs = end.getTime();

  return entries
    .filter((appointment) => {
      const appointmentStartMs = new Date(
        appointment.timeslot.startTime,
      ).getTime();
      return (
        appointmentStartMs >= startMs && appointmentStartMs <= endMs
      );
    })
    .sort(
      (a, b) =>
        new Date(a.timeslot.startTime).getTime() -
        new Date(b.timeslot.startTime).getTime(),
    );
}

/**
 * Fetch the appointments for the current week (when no date is selected)
 * or for the selected date, from the appointments endpoint.
 */
export function useAppointments(selectedDate: Date | undefined) {
  const [appointments, setAppointments] = useState<AppointmentEntry[] | null>(
    null,
  );
  const [error, setError] = useState<Error | null>(null);
  const [refetchKey, setRefetchKey] = useState<number>(0);

  // Reset the previous result as soon as the request inputs change so the
  // stale list is never shown for the new date/week.
  const [lastRequest, setLastRequest] = useState<{
    date: Date | undefined;
    key: number;
  }>({ date: selectedDate, key: refetchKey });

  if (lastRequest.date !== selectedDate || lastRequest.key !== refetchKey) {
    setLastRequest({ date: selectedDate, key: refetchKey });
    setAppointments(null);
    setError(null);
  }

  useEffect(() => {
    let cancelled = false;

    fetchAppointments(selectedDate)
      .then((result) => {
        if (!cancelled) {
          setAppointments(result);
        }
      })
      .catch((caughtError) => {
        if (!cancelled) {
          setError(
            caughtError instanceof Error
              ? caughtError
              : new Error("Failed to load appointments"),
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, [selectedDate, refetchKey]);

  return {
    appointments,
    loading: appointments === null,
    error,
    refetch: () => setRefetchKey((key) => key + 1),
  };
}
