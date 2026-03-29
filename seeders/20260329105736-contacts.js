'use strict';
import path from "path";
import fs from "fs/promises";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    const filePath = path.resolve("data/contacts.json");
    const data = await fs.readFile(filePath, "utf-8");
    const contacts = JSON.parse(data);

    const users = await queryInterface.sequelize.query(
        `SELECT id FROM "users" LIMIT 1;`,
        { type: Sequelize.QueryTypes.SELECT }
      );
    const ownerId = users[0].id; 

    await queryInterface.bulkInsert(
      "contacts",
      contacts.map((contact) => ({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        favorite: contact.favorite || false,
        owner: ownerId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      { ignoreDuplicates: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('contacts', null, {});
  }
};
