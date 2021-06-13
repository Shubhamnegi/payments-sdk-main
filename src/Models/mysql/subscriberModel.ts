import { MysqlConnection } from '../../Connections/MysqlConnection'
import { DataTypes } from 'sequelize'
import { hash } from '../../Helpers/hash';

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

if (process.env.NODE_ENV && process.env.NODE_ENV === 'local') {
    (async () => {
        await Subscriber.sync({ force: true })
    })()
}