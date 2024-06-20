import { Event_Proj } from "./Event_proj";
import { User } from "./User";

export interface Registration {
    user : User ;
    registrationId: string;
    event : Event_Proj;
    status: String
}
