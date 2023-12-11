import jwt from 'jsonwebtoken';
import { TokenPayload } from '../types/token.type.js';
import { Auth } from './auth.js';
import { compare, hash } from 'bcrypt';
import { HttpError } from '../types/http.error.js';

jest.mock('bcrypt');  
jest.mock('jsonwebtoken')

describe('Given Auth abstract class', () => {
  describe('When se use its methods', () => {

    test('Then hash should ...',  () => {

      (hash as jest.Mock).mockReturnValue('test');
      const mockValue = '';
      const result = Auth.hash(mockValue);
      expect(hash).toHaveBeenCalled();
      expect(result).toBe('test');

    });

    test('Then compare should ...', () => {

      (compare as jest.Mock).mockReturnValue(true);
      const mockValue = '';
      const result = Auth.compare(mockValue, mockValue);
      expect(compare).toHaveBeenCalled();
      expect(result).toBe(true);

    });

    test('Then signJWT should ...', () => {

      (jwt.sign as jest.Mock).mockReturnValue('test');
      const mockValue = {}as unknown as TokenPayload;
      const result = Auth.signJWT(mockValue);
      expect(jwt.sign).toHaveBeenCalled();
      expect(result).toBe('test');

    });

    test('Then verifyAndGetPayload should ...', () => {

      (jwt.verify as jest.Mock).mockReturnValue({}) as unknown as jwt.JwtPayload;
      Auth.verifyAndGetPayload('');
      expect(jwt.verify).toHaveBeenCalled();
  
      const mockError = new HttpError(498, 'Invalid token', '');
      jwt.verify = jest.fn().mockReturnValue('');
      expect(() => Auth.verifyAndGetPayload('')).toThrow(mockError);
      expect(jwt.verify).toHaveBeenCalled();

    });

  })
})
