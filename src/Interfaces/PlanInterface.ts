export interface PlanInterface {
    planName: string,
    orders: number,
    businessUnits: number,
    price: number,
    status: boolean,
    createdAt?: Date,
    updatedAt?: Date
}