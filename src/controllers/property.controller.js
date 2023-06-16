import sequelize from "../database/connect.js";
import Property from "../models/property.model.js";

const getProperties = async function () {
    try {

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    Property.findAll({});
};

export default {
    getProperties
};