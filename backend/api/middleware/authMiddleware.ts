import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = '2bb80d537b1da3e38bd30361aa855686bde0b2e5b9e6e109f2ba5b662e60fb6c';

interface AuthenticatedRequest extends Request {
  user?: string;
}

export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }

      req.user = (user as { username: string }).username;
      next();
    });
  } else {
    res.status(401).json({ message: 'Bad request' });
  }
};
