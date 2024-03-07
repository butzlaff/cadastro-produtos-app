import * as chai from 'chai';
import * as sinon from 'sinon';
import { app } from '../app';
import UserModel from '../database/models/User';
import JWT from '../utils/JWT';
import { adminCreated } from './mocks/user.mock';
// @ts-ignore
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test User functions behavior', () => {
  beforeEach(() => {
    sinon.restore();
  });
  describe('Test login behavior', () => {
    it('Test login sucessfull', async () => {
      sinon.stub(UserModel, 'create').resolves(adminCreated as any);
      sinon.stub(JWT, 'sign').returns('valid token');

      const { status, body } = await chai
        .request(app)
        .post('/user/register')
        .send({
          email: 'admin@admin.com',
          username: 'admin',
          password: 'secret_admin',
        });

      expect(status).to.equal(201);
      expect(body).to.deep.equal({ token: 'valid token' });
    });
  });
});
