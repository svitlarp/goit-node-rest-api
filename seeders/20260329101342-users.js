'use strict';
import path from "path";
import fs from "fs/promises";
import bcrypt from "bcrypt";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    const filePath = path.resolve("data/users.json");
    const data = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(data);
    const seedPassword = process.env.SEED_PASSWORD || "defaultPassword123"; 
    const passwordHash = await bcrypt.hash(seedPassword, 10);

    await queryInterface.bulkInsert(
      "users",
      users.map((user) => ({
        email: user.email,
        password: passwordHash,
        subscription: user.subscription,
        avatarURL: user.avatarURL || null,
        token: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
      , {ignoreDuplicates: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
