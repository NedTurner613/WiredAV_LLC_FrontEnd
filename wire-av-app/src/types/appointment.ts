import type { Personnel } from "./personnel";
import type { Client } from "./client";
import type { Timeslot } from "./timeslot";

export type Appointment = {
    
id: string; 
status: "requested" | "assigned" | "closed" | "canceled";
personnel: Personnel[];
client: Client[];
timeslot: Timeslot[];
appType: "consultation" | "installation" | "maintenance";

}