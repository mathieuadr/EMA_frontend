import { Registration } from "./Registration";

export interface Feedback{
    id_feedback: String;
    description: String;
    registration: Registration;
    rating :Int16Array;

}
export type FeedbackCreateInput = Omit<Feedback, "id_feedback"> 