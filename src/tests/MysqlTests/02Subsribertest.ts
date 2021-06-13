import { init } from '../maintest';
init();

import { expect } from 'chai'
import { MysqlConnection } from '../../Connections/MysqlConnection';
import { SubscriberRepository } from '../../Repositories/mysql/subscriberRepository'
import { SubsriberInterface } from '../../Interfaces/SubsriberInterface';
import { SubscriberNotFound } from '../../Errors/SubscriberNotFound';
import { SubscriberStatus } from '../../Types/SubscriberStatus';
import { UsernameAlreadyTaken } from '../../Errors/UsernameAlreadyTaken';
import { PlansRepository } from '../../Repositories/mysql/plansRepository';
import { ForeignKeyConstraintError } from 'sequelize';

describe('Mysql Respository test suite - Subscriber', () => {
    const user: SubsriberInterface = {
        name: "username test",
        username: "username_test",
        password: "safe"
    }


    const commonCheck = (res: SubsriberInterface) => {

        expect(res).to.haveOwnProperty('id');
        expect(res.name).to.be.eql(user.name);
        expect(res.username).to.be.eql(user.username);
        expect(res.password).not.to.be.null;
        expect(res.password).not.to.be.eql(user.password);
        expect(res.createdAt).not.to.be.null;
        expect(res.updatedAt).not.to.be.null;
    }

    before('should be able to connec to database', async () => {
        MysqlConnection.connect();
        await MysqlConnection.checkHealth();
    });

    it('Should throw subscriber not found exception', async () => {
        try {
            await SubscriberRepository.getUserByUserName(user.username);
        } catch (error) {
            expect(error instanceof SubscriberNotFound)
        }
    });

    it('Should be able to create new subscriber', async () => {
        const res = await SubscriberRepository.createUser(user);

        commonCheck(res);
        expect(res.status).to.be.eql(SubscriberStatus.ACTIVE);
    });

    it('Should throw an error on duplicate entry', async () => {
        try {
            await SubscriberRepository.createUser(user);
        } catch (error) {
            expect(error instanceof UsernameAlreadyTaken).to.be.eql(true);
        }
    });

    it('Should be able to find subscriber', async () => {
        const res = await SubscriberRepository.getUserByUserName(user.username);

        commonCheck(res);
        expect(res.status).to.be.eql(SubscriberStatus.ACTIVE);
    });

    it('should be able to suspend subscriber', async () => {
        const res = await SubscriberRepository.suspendUser(user.username);

        commonCheck(res);
        expect(res.status).to.be.eql(SubscriberStatus.SUSPENDED);
    });

    it('should be able to list all users', async () => {
        const res = await SubscriberRepository.getAllUsers();
        expect(Array.isArray(res)).to.be.eql(true);
        expect(res.length).to.be.greaterThan(0);
    });


    it('should be able to list all active users', async () => {
        const newUser = Object.assign(user);
        newUser.name = 'username active'
        newUser.username = 'username_active'
        await SubscriberRepository.createUser(newUser);

        const res = await SubscriberRepository.getAllUsers(SubscriberStatus.ACTIVE);
        expect(Array.isArray(res)).to.be.eql(true);
        expect(res.length).to.be.greaterThan(0);
        for (const r of res) {
            expect(r.status).to.be.eql(SubscriberStatus.ACTIVE);
        }
    });

    it('should fail wile updating with invalid plan', async () => {
        try {
            await SubscriberRepository.updatePlan('username_active', 'invalid name');
        } catch (error) {
            expect(error).to.be.instanceOf(ForeignKeyConstraintError)
        }
    })

    it('should be able to update then plan', async () => {
        const plan = await PlansRepository.getPlanByName('TEST_PLAN');
        const sub = await SubscriberRepository.updatePlan('username_active', plan.planName);

        commonCheck(sub);
        expect(sub.status).to.be.eql(SubscriberStatus.ACTIVE);
    })

    after('Close connection', () => {
        MysqlConnection.disconnect();
    });
})
