const { Model, DataTypes } = require('sequelize');

class Book extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      author: DataTypes.STRING,
      rating: DataTypes.DECIMAL,
      description: DataTypes.STRING,
      intention: DataTypes.INTEGER,
      value: DataTypes.DOUBLE,
      image: DataTypes.STRING
    }, { 
      sequelize,
      freezeTableName: true,
    });
  }

  static associate (models) {
    this.belongsTo(models.User, { foreignKey: 'id_user', as: 'books' });
  }
}

module.exports = Book;
