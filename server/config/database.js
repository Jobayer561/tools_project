import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.oxmkd9u.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;
let userCollection;
let todoCollection;

export async function connectDb() {
  try {
    if (db && userCollection && todoCollection) {
      return { db,userCollection, todoCollection, client };
    }

    await client.connect();

    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB Connected Successfully hello world");

    db = client.db("tools");
    userCollection = db.collection("users");
    todoCollection = db.collection("todos");

    return { db, userCollection, todoCollection, client };
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

export { client };
