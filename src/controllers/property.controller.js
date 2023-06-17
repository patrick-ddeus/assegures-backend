import Property from "../models/property.model.js";

const getProperties = async function () {
    try {
        const properties = await Property.findAll({});
        return res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    getProperties
};