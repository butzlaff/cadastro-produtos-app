import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DecimalDataType,
} from 'sequelize';
import db from '.';

class Product extends Model<InferAttributes<Product>,
InferCreationAttributes<Product>> {
  declare id: CreationOptional<number>;

  declare name: string;

  declare brand: string;

  declare model: string;

  declare price: number;

  declare color: string;
};

Product.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
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
    type: DataTypes.NUMBER(),
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'products',
  timestamps: false,
  underscored: true,
});

export default Product;
