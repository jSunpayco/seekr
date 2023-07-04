import { Statuses } from "./Statuses";

export interface Job {
    JobID: number;
    Date: string;
    Month: string;
    Category: string;
    Company: string;
    Location: string;
    Statuses: Statuses[];
    Title: string;
    Type: string;
    URL: string;
}