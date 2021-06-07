import { Plan } from '../../Models/mysql/planModel'

export class PlansRepository {
    public static async getAllPlans() {
        const result = await Plan.findAll();
        return result.map(x => x.toJSON())
    }
}