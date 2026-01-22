import { ObjectId } from "mongodb";
import { connectDb } from "../config/database.js";

export const createUser = async(req,res)=>{
    const {name,email,password} = req.body;

    try{
        const { userCollection } = await connectDb();
        const result = await userCollection.insertOne({name,email,password});
        res.status(201).json({ message: "User created successfully", userId: result.insertedId });
    }catch(err){
        console.error("Error creating user:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

