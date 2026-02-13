import { DataTypes } from 'sequelize';
import sequelize from './connection.js';

const User = sequelize.define(
    'users',
    {
        fullName:{
            type:DataTypes.STRING,
        },
        email:{
            type:DataTypes.STRING,
        },
        password:{
            type:DataTypes.STRING,
        },
        role:{
            type:DataTypes.INTEGER,
        }
    },
    {
        timestamps:true,
    }
);

export default User;