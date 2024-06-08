import { User } from "./User";

export interface Registration {
    user : User ;
    registrationId: string;
    event : Event;
    status: String
}
