export class PlanNotFound extends Error {
    constructor(plan: string) {
        super("Error occured search for plan named " + plan)
        this.name = 'PlanNotFound';
        // This is required
        Object.setPrototypeOf(this, PlanNotFound.prototype);
    }
}