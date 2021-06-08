export class PlanNotFound extends Error {
    constructor(plan: string) {
        super("Error occured search for plan named " + plan)
    }
}