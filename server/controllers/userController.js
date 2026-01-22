import { CURSOR_FLAGS, ObjectId } from "mongodb";
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

export const loginUser = async(req,res)=>{
    const {email,password} = req.body;

    try{
        const { userCollection } = await connectDb();
        const user = await userCollection.findOne({email});
        
        if(!user){
            return res.status(401).json({ message: "Invalid email or password" });
        }
        
        if(user.password !== password){
            return res.status(401).json({ message: "Invalid email or password" });
        }
        
        res.status(200).json({ message: "Login successful", userId: user._id });
    }catch(err){
        console.error("Error logging in:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getUser = async(req,res)=>{
    try {
                const { userCollection } = await connectDb();
        const users = await userCollection.find(
            {},
            { projection: { password: 0 } }
        ).toArray();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

