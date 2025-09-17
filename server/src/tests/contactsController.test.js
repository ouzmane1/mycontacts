import { getContacts } from '../controllers/contactController.js';
import Contact from '../models/contact.js';

jest.mock('../models/contact.js'); 

describe('getContacts', () => {
  it('renvoie les contacts de l\'utilisateur connecté', async () => {
    const userId = '123';
    const contactsMock = [
      { firstName: 'Ousmane', lastName: 'Ndome', phone: 601020304, userId },
      { firstName: 'Goat', lastName: 'La Pulga', phone: 705060708, userId }
    ];

    Contact.find.mockResolvedValue(contactsMock);

    const req = {
      user: { userId }
    };
    const res = {
      json: jest.fn()
    };
    await getContacts(req, res);
    expect(Contact.find).toHaveBeenCalledWith({ userId });
    expect(res.json).toHaveBeenCalledWith(contactsMock);
  });

  it('renvoie une erreur serveur si la BDD échoue', async () => {
    Contact.find.mockRejectedValue(new Error('Erreur BDD'));

    const req = {
      user: { userId: '123' }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getContacts(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur BDD' });
  });
});
