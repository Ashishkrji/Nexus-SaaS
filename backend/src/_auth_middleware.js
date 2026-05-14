import jwt from 'jsonwebtoken';
import { User } from './_models.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const authMiddleware = async (req) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) throw new Error('Unauthorized');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) throw new Error('User not found');
    
    // Return a structure similar to Supabase user object for compatibility
    return { id: user._id.toString(), email: user.email, user_metadata: { name: user.name } };
  } catch (err) {
    throw new Error('Invalid token');
  }
};

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });
};
