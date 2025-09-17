import authMiddleware from '../middlewares/authMiddleware.js';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('authMiddleware', () => {
  it('refuse l’accès si aucun token n’est fourni', () => {
    const req = { headers: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Accès refusé : token manquant" });
  });

  it('accepte si le token est valide', () => {
    const req = { headers: { authorization: 'Bearer validtoken' } };
    const res = {};
    const next = jest.fn();
    jwt.verify.mockReturnValue({ userId: '123' });

    authMiddleware(req, res, next);

    expect(req.user).toEqual({ userId: '123' });
    expect(next).toHaveBeenCalled();
  });
});
