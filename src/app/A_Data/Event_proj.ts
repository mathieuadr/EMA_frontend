import { User } from "./User";

export interface Event_Proj{
    idEvent :String;
    title : String;
    description : String;
    dateBegining : Date;
    eventStatus: String;
    date_end: Date;
    location: String;
    idCreator: User;
}

export type EventCreateInput = Omit<Event_Proj, "idEvent" | "eventStatus">;