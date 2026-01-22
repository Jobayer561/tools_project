import { ObjectId } from "mongodb";
import { connectDb } from "../config/database.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body; 



    const { todoCollection } = await connectDb();

    const result = await todoCollection.insertOne({
      title,
      description: description || "", 
      completed: false,
      createdAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getTodos = async (req, res) => {
  try {
    const { todoCollection } = await connectDb();
    const todos = await todoCollection.find().sort({ createdAt: -1 }).toArray();

    res.json({
      success: true,
      data: todos,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

   

    const data = req.body;
    const { todoCollection } = await connectDb();

    const result = await todoCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: data },
    );

 
    res.json({
      success: true,
      message: "Todo updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

   

    const { todoCollection } = await connectDb();

    const result = await todoCollection.deleteOne({
      _id: new ObjectId(id),
    });



    res.json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};