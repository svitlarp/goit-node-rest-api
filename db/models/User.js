
import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";
import { emailRegex } from "../../constants/authConstants.js";


const User = sequelize.define("user", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: "Email in use"
        },
        validate: {
            is: emailRegex,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    // TODO add subscription and token fields
});


await User.sync({ alter: true});

export default User;
