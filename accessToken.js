import { DataTypes } from "sequelize";
import sequelize from "./connection.js";
import sequelizeTransforms from "sequelize-transforms";

const AccessToken = sequelize.define(
  "accessToken",
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    isRevoked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    expireAt: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
  }
);

AccessToken.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    return values;
};

sequelizeTransforms(AccessToken);
export default AccessToken;
