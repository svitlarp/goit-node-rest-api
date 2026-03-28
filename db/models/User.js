
import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";
import { emailRegex, subscriptionList } from "../../constants/authConstants.js";


const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
    },
    avatarURL: {
        type: DataTypes.STRING,
    },
    subscription: {
        type: DataTypes.ENUM,
        values: subscriptionList,
        defaultValue: "starter"
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
});


// await User.sync({ force: true});
// await User.sync({ alter: true});

export default User;
