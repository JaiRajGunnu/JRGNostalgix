import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

// Define a type for the cached variable
interface CachedMongoose {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

// Use const instead of let for cached
const cached: CachedMongoose = (global as { mongoose?: CachedMongoose }).mongoose || { conn: null, promise: null };

// Augment the NodeJS global interface directly
declare global {
  // Use 'let' or 'const' instead of 'var'
  let mongoose: CachedMongoose | undefined; // Use undefined to avoid null checks
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string, {
      dbName: "jaislam",
    }).then((m) => m.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;