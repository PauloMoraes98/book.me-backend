const { Model, DataTypes } = require('sequelize');

class Test2 extends Model {
    static init(sequelize) {
        super.init({
            description: DataTypes.STRING,
        }, {
            sequelize,
            freezeTableName: true,
        })
    }
}

module.exports = Test2;