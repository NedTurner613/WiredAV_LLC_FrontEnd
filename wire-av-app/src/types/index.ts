type Role = "admin" | "technician";

export type User = {
  name: string;
  role: Role;
};

export type Personnel = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "technician";
};

export type Client = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};

export type Appointment = {
  id: string;
  status: "requested" | "assigned" | "closed" | "canceled";
  personnel: Personnel[];
  client: Client[];
  timeslot: Timeslot[];
  appType: "consultation" | "installation" | "maintenance";
};

export type Timeslot = {
  // id: string;
  startTime: string; // ISO 8601 format
  endTime: string; // ISO 8601 format
};

export type AppointmentStatus = Appointment["status"];

export type AppointmentType = Appointment["appType"];

/**
 * An appointment as rendered in the admin appointments table: the Appointment
 * fields plus the raw API codes and ids the update endpoint expects.
 */
export type AppointmentRow = {
  id: string;
  apptId: number;
  status: AppointmentStatus;
  statusValue: number;
  appType: AppointmentType;
  appTypeValue: number;
  client: Appointment["client"];
  personnel: Appointment["personnel"];
  timeslot: Appointment["timeslot"];
  clientId: number | null;
  personnelId: number | null;
  createdAt: string | null;
};

/** Body sent to PUT /api/appointments (ModifyAppointmentRequestDTO). */
export type AppointmentChanges = {
  apptId: number;
  status: number;
  appType: number;
  timeslot: {
    startTime: string;
    endTime: string;
  };
  clientId: number | null;
  personnelId: number | null;
  createdAt: string | null;
};
