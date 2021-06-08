import { init } from '../maintest';
init();

import { expect } from 'chai'
import { PlansRepository } from '../../Repositories/mysql/plansRepository'
import { MysqlConnection } from '../../Connections/MysqlConnection';
import { PlanInterface } from '../../Interfaces/PlanInterface';
import { PlanNotFound } from '../../Errors/PlanNotFound';



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


    it('should be able to insert plan', async () => {
        const result = await PlansRepository.insertIntoPlan(plan);

        expect(result).to.be.not.null;
        expect(result).to.haveOwnProperty('planName');
        expect(result.planName).to.be.eql(plan.planName);
    })

    it('should be able to get plan', async () => {
        const result = await PlansRepository.getAllPlans();
        expect(Array.isArray(result)).to.be.eqls(true)
        expect(result.length).to.be.greaterThan(0);
    });
    
    it('should fail on invalid name', async () => {
        try {
            await PlansRepository.getPlanByName("invalid name");
        } catch (error) {
            expect(error instanceof PlanNotFound).to.be.eql(true);
        }
    })

    it('should be able to get plan by name', async () => {
        const result = await PlansRepository.getPlanByName(plan.planName);

        expect(result).to.be.not.null;
        expect(result).to.haveOwnProperty('planName');
        expect(result.planName).to.be.eql(plan.planName);
    })



    it('should be able to update status', async () => {
        await PlansRepository.updatePlanStatus(plan.planName, false);
        const result = await PlansRepository.getPlanByName(plan.planName);
        expect(result.planName).to.be.eql(plan.planName);
        expect(result.status).to.be.eql(false);

    })

    it('should fail to get active plans', async () => {
        const result = await PlansRepository.getAllPlans(true);
        expect(result.length).to.be.eql(0)
    })



    after('Close connection', () => {
        MysqlConnection.disconnect();
    })
})