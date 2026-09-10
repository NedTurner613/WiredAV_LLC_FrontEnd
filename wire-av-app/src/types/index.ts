type Role = "admin" | "technician";

type User = {
  name: string;
  role: Role;
};

type Personnel = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "technician";
};

type Client = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};

type Appointment = {
  id: string;
  status: "requested" | "assigned" | "closed" | "canceled";
  personnel: Personnel[];
  client: Client[];
  timeslot: Timeslot[];
  appType: "consultation" | "installation" | "maintenance";
};

type Timeslot = {
  id: string;
  startTime: string; // ISO 8601 format
  endTime: string; // ISO 8601 format
};
type ApiPersonnel = {
  personnelId: number;
  firstName: string;
  lastName: string;
};

type PersonnelResponse = {
  personnelList: ApiPersonnel[];
};

type ApiClient = {
  clientId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
};

type ClientsResponse = {
  content: ApiClient[];
};
