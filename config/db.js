const dotenv = require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URL;
// if (!uri) {
//   console.error("MongoDB URL is not defined!");
//   process.exit(1);
// }
// console.log("MongoDB URI:", uri); // Debugging output

const dbName = "test";

let db;

async function connectDB() {
  if (db) return db;

  try {
    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
        tls: true,
        tlsInsecure: true, 
      });

    await client.connect();
    console.log("Connected successfully to MongoDB");
    db = client.db(dbName);

    return db;
  } catch (err) {
    console.error("Could not connect to MongoDB", err);
    process.exit(1); // Stop the process if unable to connect
  }
}

connectDB();
module.exports = connectDB;
