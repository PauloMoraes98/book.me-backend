const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const users = await User.findAll();

        return res.json(users);
    },

    async store(req, res) {
        const {
            name,
            email,
            password,
            city,
            uf,
            latitude,
            longitude,
            bio,
            image
        } = req.body;

        const user = await User.create({
            name,
            email,
            password,
            city,
            uf,
            latitude,
            longitude,
            bio,
            image
        });

        return res.json(user);
    },

    async update(req, res) {
        const {
            id
        } = req.params;
        const updated = await User.update(req.body, {
            where: {
                id
            }
        });

        if (updated) {
            const user = await User.findOne({
                where: {
                    id
                }
            });
            return res.json(user);
        }
    },

    async delete(req, res) {
        const {
            id
        } = req.params;

        const user = await User.findOne({
            where: {
                id
            }
        })

        await user.destroy(user);

        return res.json();
    },
};