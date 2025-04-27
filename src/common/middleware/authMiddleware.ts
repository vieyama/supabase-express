import { Request, Response, NextFunction } from 'express';
import { supabase } from '../utils/supabase';
import { PropertiesCustomRequest } from '../types/properties';

async function verifyToken(token: string) {
  const { data: { user }, error } = await supabase.auth.getUser(token);
  return { user, error }
}

export async function authMiddleware(req: PropertiesCustomRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.split(' ')[1];
  const { error, user } = await verifyToken(token)

  if (error !== null || user === null) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }

  req.user = user

  next();
}