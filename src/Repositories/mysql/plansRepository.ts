import { PlanNotFound } from '../../Errors/PlanNotFound';
import { PlanInterface } from '../../Interfaces/PlanInterface';
import { Plan } from '../../Models/mysql/planModel'

export class PlansRepository {
    /**
     * To get all pans
     * @param active To get all active plans
     */
    public static async getAllPlans(active: boolean | null = null) {
        let where;
        if (active) {
            where = {
                where: {
                    active
                }
            }
        }
        const result = await Plan.findAll(where);
        return result.map(x => x.toJSON())
    }

    /**
     * To insert into plan
     */
    public static async insertIntoPlan(plan: PlanInterface) {
        const result = await Plan.create(plan)
        return result.toJSON() as PlanInterface;
    }

    public static async getPlanByName(planName: string) {
        const result = await Plan.findOne({
            where: {
                planName
            }
        });
        if (!result) {
            throw new PlanNotFound(planName)
        }
        return result.toJSON() as PlanInterface
    }
}