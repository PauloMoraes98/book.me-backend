const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      city: DataTypes.STRING,
      uf: DataTypes.STRING,
      latitude: DataTypes.DOUBLE,
      longitude: DataTypes.DOUBLE,
      bio: DataTypes.STRING,
      image: DataTypes.STRING
    }, { 
      sequelize,
      freezeTableName: true,
    });
  }

  static associate (models) {
    this.hasMany(models.Book, { foreignKey: 'id_user', as: 'books' });
  }
}

module.exports = User;
