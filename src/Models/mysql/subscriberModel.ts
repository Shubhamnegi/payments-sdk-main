import { MysqlConnection } from '../../Connections/MysqlConnection'
import { DataTypes } from 'sequelize'
import { hash } from '../../Helpers/hash';
import { Plan } from './planModel';

const sequelize = MysqlConnection.getConnection();

export const Subscriber = sequelize.define('Subscriber', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            const newPassword = this.getDataValue('username') + value; // append username for salting
            this.setDataValue('password', hash(newPassword));
        }
    },
    planStartDate: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "Date time when new plan started from"
    },
    planExpiryDate: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "Expiry time when plan stops working"
    },
    status: {
        type: DataTypes.ENUM,
        values: ['active', 'suspended'],
        defaultValue: 'active'
    }
}, {
    createdAt: true,
    updatedAt: true,
    tableName: "subscribers"
});

Subscriber.belongsTo(Plan, {
    foreignKey: {
        allowNull: true,
        name: "plan",
        field: "plan"
    }
});

if (process.env.NODE_ENV && process.env.NODE_ENV === 'local') {
    (async () => {
        await Subscriber.sync({ force: true })
    })()
}