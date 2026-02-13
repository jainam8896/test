import dbConnection from "./connection.js";

//models
import User from "./user.js";
import AccessToken from "./accessToken.js";
import RefreshToken from "./refreshToken.js";


//------------AccesToken-User Model------------
AccessToken.belongsTo(User, {
    foreignKey: "userId",
    as: "users",
    targetKey: "id",
    onDelete: "CASCADE",
});

User.hasMany(AccessToken, {
    foreignKey: "userId",
    sourceKey: "id",
});

//------------RefreshToken-User Model------------
RefreshToken.belongsTo(User, {
    foreignKey: "userId",
    as: "users",
    targetKey: "id",
    onDelete: "CASCADE",
});

User.hasMany(RefreshToken, {
    foreignKey: "userId",
    sourceKey: "id",
});

const db = {};
db.sequelize = dbConnection;

export default db;
