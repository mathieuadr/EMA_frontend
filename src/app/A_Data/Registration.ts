import { Event_Proj } from "./Event_proj";
import { User } from "./User";

export interface Registration {
    dateBegining: string | number | Date;
    user : User ;
    registrationID: string;
    event : Event_Proj;
    status: String
}
export type RegistrationCreateInput = Omit<Registration, "registrationid"> 
