import { DataTypes, Model, QueryInterface } from 'sequelize';
import { IProduct } from '../../interfaces/IProducts';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IProduct>>('products', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(),
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('users');
  },
};