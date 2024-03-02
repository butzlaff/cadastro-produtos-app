import { NextFunction, Request, Response } from 'express';
import JWT, { TokenJWT } from '../utils/JWT';

function extractToken(bearerToken: string) {
  const token = bearerToken.split(' ')[0];
  if (token !== 'Bearer') {
    return bearerToken;
  }
  return bearerToken.split(' ')[1];
}

class Validations {
  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const extractedToken = extractToken(token);
    const validToken = JWT.verify(extractedToken);
    const result: TokenJWT = JWT.decode(extractedToken);
    if (validToken === 'Token must be a valid Token' || !result) {
      return res.status(401).json({ message: validToken });
    }

    req.body.email = result.email;

    next();
  }
}

export default Validations;
