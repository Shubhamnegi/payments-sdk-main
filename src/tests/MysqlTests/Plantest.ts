import { init } from '../maintest';
init();

import { expect } from 'chai'
import { PlansRepository } from '../../Repositories/mysql/plansRepository'
import { MysqlConnection } from '../../Connections/MysqlConnection';



describe('mysql Respository test suite - Plans', () => {
    before('should be able to connec to database', async () => {
        MysqlConnection.connect();
        await MysqlConnection.checkHealth();
    });
    it('Should be able to get plan', async () => {
        const result = await PlansRepository.getAllPlans();

        expect(Array.isArray(result)).to.be.eqls(true)
    })
    after('Close connection', () => {
        MysqlConnection.disconnect();
    })
})