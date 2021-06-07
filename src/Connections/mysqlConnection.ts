import { Sequelize } from 'sequelize';
import { DbConstants } from '../Constants/db';
import { getLogger } from '../Helpers/logger';

const logger = getLogger('DB_LOGGER');

export class MysqlConnection {
    protected static logger = getLogger('DB_LOGGER');
    protected static sequelize: Sequelize

    public static connect() {
        if (this.sequelize) {
            return this.sequelize;
        }
        this.logger.info("Initiating connection");
        this.sequelize = new Sequelize(
            DbConstants.DATABASE,
            DbConstants.USERNAME,
            DbConstants.PASSWORD,
            {
                host: DbConstants.HOST,
                dialect: 'mysql',
                logging: msg => {
                    logger.debug(msg)
                },
                pool: {
                    min: 1,
                    max: 10
                }
            }
        );
        return this.sequelize;
    }

    /**
     * This will try to authenticate with database
     */
    public static async checkHealth() {
        this.logger.debug("Initiating health Check");
        await this.sequelize.authenticate(); // Authenticate DB
    }

    public static getConnection() {
        return this.connect();
    }

}
