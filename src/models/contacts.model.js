import { DataTypes } from 'sequelize';
import sequelize from '../database/connect.js';

const Contact = sequelize.define('contact', {
    avatar: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

(async () => {
    await Contact.sync({ force: true });
})();

export default Contact;