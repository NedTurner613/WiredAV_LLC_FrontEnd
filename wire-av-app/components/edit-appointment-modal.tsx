"use client";

import { useState, type FormEvent } from "react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import type {
  AppointmentChanges,
  AppointmentRow,
  AppointmentStatus,
  AppointmentType,
} from "@/src/types";

/**
 * Status / appointment-type codes used by the appointments API.
 * The API stores both as integers, so the table and the form work with the
 * numeric codes and only convert to the Appointment type's labels for display.
 */
export const APPOINTMENT_STATUS_LABELS: Record<number, string> = {
  1: "Requested",
  2: "Assigned",
  3: "Closed",
  4: "Canceled",
};

export const APPOINTMENT_TYPE_LABELS: Record<number, string> = {
  1: "Consultation",
  2: "Installation",
  3: "Maintenance",
};

export function appointmentStatusLabel(value: number): string {
  return APPOINTMENT_STATUS_LABELS[value] ?? `Status ${value}`;
}

export function appointmentTypeLabel(value: number): string {
  return APPOINTMENT_TYPE_LABELS[value] ?? `Type ${value}`;
}

const STATUS_NAMES: Record<number, AppointmentStatus> = {
  1: "requested",
  2: "assigned",
  3: "closed",
  4: "canceled",
};

const TYPE_NAMES: Record<number, AppointmentType> = {
  1: "consultation",
  2: "installation",
  3: "maintenance",
};

/** Map an API status code onto the Appointment type's status. */
export function appointmentStatusName(value: number): AppointmentStatus {
  return STATUS_NAMES[value] ?? "requested";
}

/** Map an API appointment-type code onto the Appointment type's appType. */
export function appointmentTypeName(value: number): AppointmentType {
  return TYPE_NAMES[value] ?? "consultation";
}

export type AppointmentSelectOption = {
  value: string;
  label: string;
};

const NONE = "none";

function toOptions(labels: Record<number, string>): AppointmentSelectOption[] {
  return Object.entries(labels).map(([value, label]) => ({ value, label }));
}

/** Keep the record's own code selectable even if it is not one of the known ones. */
function withCurrentValue(
  options: AppointmentSelectOption[],
  currentValue: number,
  label: (value: number) => string,
): AppointmentSelectOption[] {
  const value = String(currentValue);
  return options.some((option) => option.value === value)
    ? options
    : [{ value, label: label(currentValue) }, ...options];
}

function parseDate(value: string | undefined): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Build a local ISO 8601 string (no timezone shift) from a date and time. */
function toLocalIso(date: string, time: string): string {
  if (!date || !time) return "";
  const parsed = new Date(`${date}T${time}:00`);
  return Number.isNaN(parsed.getTime())
    ? ""
    : format(parsed, "yyyy-MM-dd'T'HH:mm:ss");
}

type EditAppointmentFormProps = {
  appointment: AppointmentRow;
  clientOptions: AppointmentSelectOption[];
  personnelOptions: AppointmentSelectOption[];
  isSaving: boolean;
  error: string | null;
  onCancel: () => void;
  onSave: (changes: AppointmentChanges) => void;
};

function EditAppointmentForm({
  appointment,
  clientOptions,
  personnelOptions,
  isSaving,
  error,
  onCancel,
  onSave,
}: EditAppointmentFormProps) {
  const timeslot = appointment.timeslot[0];
  const start = parseDate(timeslot?.startTime);
  const end = parseDate(timeslot?.endTime);

  const [date, setDate] = useState(start ? format(start, "yyyy-MM-dd") : "");
  const [startTime, setStartTime] = useState(start ? format(start, "HH:mm") : "");
  const [endTime, setEndTime] = useState(end ? format(end, "HH:mm") : "");
  const [type, setType] = useState(String(appointment.appTypeValue));
  const [status, setStatus] = useState(String(appointment.statusValue));
  const [clientId, setClientId] = useState(
    appointment.clientId != null ? String(appointment.clientId) : NONE,
  );
  const [personnelId, setPersonnelId] = useState(
    appointment.personnelId != null ? String(appointment.personnelId) : NONE,
  );

  const statusOptions = withCurrentValue(
    toOptions(APPOINTMENT_STATUS_LABELS),
    appointment.statusValue,
    appointmentStatusLabel,
  );
  const typeOptions = withCurrentValue(
    toOptions(APPOINTMENT_TYPE_LABELS),
    appointment.appTypeValue,
    appointmentTypeLabel,
  );
  const clientSelectOptions =
    appointment.clientId != null &&
    !clientOptions.some((option) => option.value === String(appointment.clientId))
      ? [
          {
            value: String(appointment.clientId),
            label: `${appointment.client[0]?.name ?? "Current client"} (current)`,
          },
          ...clientOptions,
        ]
      : clientOptions;
  const personnelSelectOptions =
    appointment.personnelId != null &&
    !personnelOptions.some(
      (option) => option.value === String(appointment.personnelId),
    )
      ? [
          {
            value: String(appointment.personnelId),
            label: `${appointment.personnel[0] ? `${appointment.personnel[0].firstName} ${appointment.personnel[0].lastName}` : "Current technician"} (current)`,
          },
          ...personnelOptions,
        ]
      : personnelOptions;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSaving) return;

    onSave({
      apptId: appointment.apptId,
      status: Number(status),
      appType: Number(type),
      timeslot: {
        startTime: toLocalIso(date, startTime),
        endTime: toLocalIso(date, endTime),
      },
      clientId: clientId === NONE ? null : Number(clientId),
      personnelId: personnelId === NONE ? null : Number(personnelId),
      createdAt: appointment.createdAt,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="edit-appointment-client">Client</Label>
        <Select
          value={clientId}
          onValueChange={(value) => {
            if (value !== null) setClientId(value);
          }}
          items={[{ value: NONE, label: "No client" }, ...clientSelectOptions]}
        >
          <SelectTrigger id="edit-appointment-client" className="w-full">
            <SelectValue placeholder="Select a client" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={NONE}>No client</SelectItem>
              {clientSelectOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="edit-appointment-personnel">Technician</Label>
        <Select
          value={personnelId}
          onValueChange={(value) => {
            if (value !== null) setPersonnelId(value);
          }}
          items={[{ value: NONE, label: "Unassigned" }, ...personnelSelectOptions]}
        >
          <SelectTrigger id="edit-appointment-personnel" className="w-full">
            <SelectValue placeholder="Select a technician" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={NONE}>Unassigned</SelectItem>
              {personnelSelectOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="edit-appointment-date">Date</Label>
        <Input
          id="edit-appointment-date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="edit-appointment-start">Start Time</Label>
          <Input
            id="edit-appointment-start"
            type="time"
            value={startTime}
            onChange={(event) => setStartTime(event.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="edit-appointment-end">End Time</Label>
          <Input
            id="edit-appointment-end"
            type="time"
            value={endTime}
            onChange={(event) => setEndTime(event.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="edit-appointment-type">Type</Label>
          <Select
            value={type}
            onValueChange={(value) => {
              if (value !== null) setType(value);
            }}
            items={typeOptions}
          >
            <SelectTrigger id="edit-appointment-type" className="w-full">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {typeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="edit-appointment-status">Status</Label>
          <Select
            value={status}
            onValueChange={(value) => {
              if (value !== null) setStatus(value);
            }}
            items={statusOptions}
          >
            <SelectTrigger id="edit-appointment-status" className="w-full">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
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
          disabled={isSaving}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

type EditAppointmentModalProps = {
  appointment: AppointmentRow | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientOptions: AppointmentSelectOption[];
  personnelOptions: AppointmentSelectOption[];
  onSave: (changes: AppointmentChanges) => Promise<void>;
};

export function EditAppointmentModal({
  appointment,
  open,
  onOpenChange,
  clientOptions,
  personnelOptions,
  onSave,
}: EditAppointmentModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) setError(null);
    onOpenChange(nextOpen);
  };

  const handleSave = async (changes: AppointmentChanges) => {
    setError(null);
    setIsSaving(true);
    try {
      await onSave(changes);
      onOpenChange(false);
    } catch {
      setError("Could not save the appointment. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Appointment</DialogTitle>
          <DialogDescription>
            Update the appointment details below, then save your changes.
          </DialogDescription>
        </DialogHeader>
        {appointment && (
          <EditAppointmentForm
            key={appointment.id}
            appointment={appointment}
            clientOptions={clientOptions}
            personnelOptions={personnelOptions}
            isSaving={isSaving}
            error={error}
            onCancel={() => handleOpenChange(false)}
            onSave={handleSave}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
