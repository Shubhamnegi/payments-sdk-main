import { init } from '../maintest';
init();

import { expect } from 'chai'
import { PlansRepository } from '../../Repositories/mysql/plansRepository'
import { MysqlConnection } from '../../Connections/MysqlConnection';
import { PlanInterface } from '../../Interfaces/PlanInterface';



describe('mysql Respository test suite - Plans', () => {
    const plan: PlanInterface = {
        planName: "TEST_PLAN" + Math.ceil(Math.random() * 1000),
        businessUnits: 5,
        orders: 1000,
        price: 0,
        status: true
    }

    before('should be able to connec to database', async () => {
        MysqlConnection.connect();
        await MysqlConnection.checkHealth();
    });

    it('should be able to get plan', async () => {
        const result = await PlansRepository.getAllPlans();
        expect(Array.isArray(result)).to.be.eqls(true)
    });

    it('should be able to insert plan', async () => {
        const result = await PlansRepository.insertIntoPlan(plan);

        expect(result).to.be.not.null;
        expect(result).to.haveOwnProperty('planName');
        expect(result.planName).to.be.eql(plan.planName);
    })

    it('should be able to get plan by name', async () => {
        const result = await PlansRepository.getPlanByName(plan.planName);

        expect(result).to.be.not.null;
        expect(result).to.haveOwnProperty('planName');
        expect(result.planName).to.be.eql(plan.planName);
    })

    after('Close connection', () => {
        MysqlConnection.disconnect();
    })
})