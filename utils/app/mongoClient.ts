import { MongoClient, Db } from 'mongodb';

let uri = process.env.MONGODB_URI || '';
let dbName = process.env.MONGODB_DB;

let cachedClient: MongoClient;
let cachedDb: Db;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

if (!dbName) {
  throw new Error('Please define the MONGODB_DB environment variable');
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri);

  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
