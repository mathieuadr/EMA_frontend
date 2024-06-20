import { User } from "./User";

export interface Event{
    idEvent :String;
    title : String;
    description : String;
    dateBegining : Date;
    eventStatus: String;
    date_end: Date;
    location: String;
    idCreator: User;
}

export type EventCreateInput = Omit<Event, "idEvent" | "eventStatus">;