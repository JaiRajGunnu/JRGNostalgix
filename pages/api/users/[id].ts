import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
// import mongoose from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();
    const { id } = req.query;
    const updates = req.body;

    console.log('API received request:', {
      id,
      updates,
      method: req.method,
      body: req.body
    });

    // Direct MongoDB update to ensure it's applied
    const result = await User.updateOne(
      { _id: id },
      { $set: { isRestricted: updates.isRestricted } }
    );

    console.log('MongoDB update result:', result);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch the updated user to return
    const updatedUser = await User.findById(id).select('-password');
    console.log('Updated user:', updatedUser);

    return res.status(200).json({
      success: true,
      user: updatedUser
    });

  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}