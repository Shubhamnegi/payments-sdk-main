import { SubscriberNotFound } from "../../Errors/SubscriberNotFound";
import { UsernameAlreadyTaken } from "../../Errors/UsernameAlreadyTaken";
import { SubsriberInterface } from "../../Interfaces/SubsriberInterface";
import { Subscriber } from "../../Models/mysql/subscriberModel";
import { SubscriberStatus } from "../../Types/SubscriberStatus";

export class SubscriberRepository {
    /**
     * To get list of all the users in the sytem
     * @param status {SubscriberStatus}
     * @returns
     */
    public static async getAllUsers(status?: SubscriberStatus): Promise<SubsriberInterface[]> {
        let where;
        if (status) {
            where = {
                status
            }
        };

        const result = await Subscriber.findAll({
            attributes: ['id', 'name', 'username', 'status'],
            where
        });
        return result.map(x => x.toJSON()) as SubsriberInterface[];
    }

    /**
     *
     * @param user {SubsriberInterface}
     * @returns
     */
    public static async createUser(user: SubsriberInterface): Promise<SubsriberInterface> {
        const exist = await Subscriber.findOne({ where: { username: user.username } });
        if (exist) {
            throw new UsernameAlreadyTaken(user.username);
        }
        const result = await Subscriber.create(user)
        return result.toJSON() as SubsriberInterface;
    }

    /**
     * To get user by username
     * @param username {string}
     * @returns
     */
    public static async getUserByUserName(username: string): Promise<SubsriberInterface> {
        const result = await Subscriber.findOne({
            where: {
                username
            }
        });
        if (!result) {
            throw new SubscriberNotFound(username)
        }
        return result.toJSON() as SubsriberInterface;
    }

    /**
     * To suspend a user
     * @param username {string}
     */
    public static async suspendUser(username: string): Promise<SubsriberInterface> {
        let result = await Subscriber.findOne({
            where: {
                username,
                status: SubscriberStatus.ACTIVE
            }
        });

        if (!result) {
            throw new SubscriberNotFound(username);
        }

        result.set('status', SubscriberStatus.SUSPENDED)
        await result.save();
        result = await result.reload();
        return result.toJSON() as SubsriberInterface;
    }
}