import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Todo from '@/models/Todo'; // Create a Todo model similar to User model

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const todos = await Todo.find();
      return res.status(200).json(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  if (req.method === 'POST') {
    try {
      const { text, completed } = req.body;
      const newTodo = new Todo({ text, completed });
      await newTodo.save();
      return res.status(201).json(newTodo);
    } catch (error) {
      console.error("Error creating todo:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      await Todo.findByIdAndDelete(id);
      return res.status(204).end();
    } catch (error) {
      console.error("Error deleting todo:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  if (req.method === 'PUT') {
    const { id } = req.query;
    const { completed } = req.body;
    try {
      await Todo.findByIdAndUpdate(id, { completed }, { new: true });
      return res.status(200).json({ message: 'Todo updated successfully' });
    } catch (error) {
      console.error("Error updating todo:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
