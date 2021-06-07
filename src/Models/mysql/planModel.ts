import { MysqlConnection } from '../../Connections/MysqlConnection'
import { DataTypes } from 'sequelize'

const sequelize = MysqlConnection.getConnection();


export const Plan = sequelize.define('Plan', {
    planName: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false
    },
    orders: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Max number of order"
    },
    businessUnits: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Max number of bu"
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Price for plan",
        defaultValue: 0
    }
}, {
    createdAt: true,
    updatedAt: true,
    tableName: "plans"
});


if (process.env.NODE_ENV && process.env.NODE_ENV === 'local') {
    (async () => {
        await Plan.sync({ alter: true })
    })()
}