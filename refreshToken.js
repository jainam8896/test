import { DataTypes } from "sequelize";
import sequelize from "./connection.js";
import sequelizeTransforms from "sequelize-transforms";
import SequelizePaginate from "sequelize-paginate";

const RefreshToken = sequelize.define(
  "refreshToken",
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accessToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    isRevoked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    expireAt: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
  }
);

RefreshToken.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};

sequelizeTransforms(RefreshToken);
SequelizePaginate.paginate(RefreshToken);
export default RefreshToken;
