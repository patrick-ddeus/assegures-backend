import { DataTypes } from 'sequelize';
import sequelize from '../database/connect.js';

const Property = sequelize.define('property', {
    id: {
        type: DataTypes.INTEGER,
        autoIncremented: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.RANGE(DataTypes.DECIMAL(10, 2)),
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    number_of_rooms: {
        type: DataTypes.RANGE(DataTypes.INTEGER),
        allowNull: false
    },
    number_of_bathrooms: {
        type: DataTypes.RANGE(DataTypes.INTEGER),
        allowNull: false
    },
    area_square: {
        type: DataTypes.RANGE(DataTypes.DECIMAL(10, 2)),
        allowNull: false
    },
    ref: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
});

(async () => {
    await Property.sync({ force: true });
})();

export default Property;