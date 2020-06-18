const Test2 = require('../models/Test2');

module.exports = {
    async index(req, res) {
        const test2 = await Test2.findAll();

        return res.json(test2)
    },

    async store(req, res) {
        const {description} = req.body;

        const test2 = await Test2.create({ description });

        return res.json(test2);
    }
};