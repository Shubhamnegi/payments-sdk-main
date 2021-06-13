import { SubscriberStatus } from "../Types/SubscriberStatus";

export interface SubsriberInterface {
    id?: number;
    name: string;
    username: string;
    password?: string;
    status?: SubscriberStatus;
    createdAt?: Date
    updatedAt?: Date
}