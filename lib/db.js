import mongoose from "mongoose";

export default async function connectToDatabase() {
  mongoose.connect(`${process.env.MONGODB_URI}`).catch((error) => console.log(error));
}