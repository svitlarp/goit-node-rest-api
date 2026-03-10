import User from "./models/User";
import Contact from "./models/Contact";


User.hasMany(Contact, {
    foreignKey: "owner",
    onDelete: "CASCADE",
});

Contact.belongsTo(User, {
    foreignKey: "owner",
});