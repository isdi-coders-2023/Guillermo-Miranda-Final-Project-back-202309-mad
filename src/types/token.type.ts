import jwt from 'jsonwebtoken';
import { UserStructure } from '../entities/user';

export type TokenPayload = {
  id: UserStructure['id'];
  email: string;
} & jwt.JwtPayload;
