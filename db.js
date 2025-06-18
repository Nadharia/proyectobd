require('dotenv').config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO;
const client = new MongoClient(uri);

async function connect() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
  return client;
}

function getDb(dbName = "socialnetwork") {
  return client.db(dbName);
}

module.exports = { connect, getDb, client };