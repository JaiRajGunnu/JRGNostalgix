import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export default async function profileHandler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT secret is not defined' });
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}
