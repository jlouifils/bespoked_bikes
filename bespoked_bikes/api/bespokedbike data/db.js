'use strict';

const bcryptjs = require('bcryptjs');
const Context = require('./context');

class Database {
  constructor(seedData, enableLogging = false) {
    this.sale = seedData.sale;
    this.client = seedData.client;
    this.enableLogging = enableLogging;
    this.context = new Context('mongodb://localhost:27017', enableLogging);
  }

  log(message) {
    if (this.enableLogging) {
      console.info(message);
    }
  }

  async hashUserPasswords(client) {
    const usersWithHashedPasswords = [];

    for (const user of client) {
      const hashedPassword = await bcryptjs.hash(user.password, 10);
      usersWithHashedPasswords.push({ ...user, password: hashedPassword });
    }

    return usersWithHashedPasswords;
  }

  async init() {
    const dbName = 'fsjstd-restapi';

    await this.context.connect(dbName);

    this.log('Hashing the user passwords...');
    const client = await this.hashUserPasswords(this.client);

    await this.context.insertDocuments('client', client);
    await this.context.insertDocuments('sales', this.sales);
  }
}

module.exports = Database;
