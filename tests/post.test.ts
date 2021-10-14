import { should, use, expect, request } from 'chai';

import chaiHttp from 'chai-http';
import app from '../src/app';
import { createConnection, getConnection } from 'typeorm';
import { it } from 'mocha';
import { Post } from '../src/entity/Post';
import logger from '../src/config/logger';
should();
use(chaiHttp);
const user1 = {
  username: 'newuser',
  password: 'newpassword',
};

const userWrongPassword = {
  username: 'newuser',
  password: 'wrongpassword',
};

const unknownUser = {
  username: 'unknownUser',
  password: 'wrongpassword',
};

describe('Blog Api', () => {
  let token = '';
  let postId = '';
  before((done) => {
    createConnection()
      .then(() => done())
      .catch((err) => done(err));
  });
  after(async () => {
    await getConnection().close();
  });

  /**
   * Test the sign up route
   */

  describe('Auth routes', () => {
    describe('POST /sign-up', () => {
      it('Should create new user', async () => {
        const res = await request(app).post('/sign-up').send(user1);
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('user');
        expect(res.body.user).to.have.all.keys('username', 'id', 'token');
      });

      it('Should error already exists user', async () => {
        const res = await request(app).post('/sign-up').send(user1);
        expect(res.status).to.eq(400);
        expect(res.body.message).to.equal('User already exists');
      });
    });

    /**
     * Test the sign in route
     */

    describe('POST /sign-in', () => {
      it('Should user login successfully', async () => {
        const res = await request(app).post('/sign-in').send(user1);
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('token');
        expect(res.body.token).to.be.a('string');
        token = res.body.token;
      });

      it('Should error invalid password', async () => {
        const res = await request(app).post('/sign-in').send(userWrongPassword);
        expect(res.status).to.eq(401);
        expect(res.body.message).to.equal('Invalid Password');
      });

      it('Should error user not found', async () => {
        const res = await request(app).post('/sign-in').send(unknownUser);
        expect(res.status).to.eq(404);
        expect(res.body.message).to.equal('User not found');
      });
    });
  });

  describe('Post routes', () => {
    describe('POST /', () => {
      it('should create post', async () => {
        const res = await request(app)
          .post('/')
          .set({ Authorization: `Bearer ${token}` })
          .send({
            title: 'Hi',
            body: 'Ok',
          });

        expect(res.status).to.eq(200);
        expect(res.body.post).to.be.an('object');
      });
    });

    describe('GET /', () => {
      it('Should get post successfully', async () => {
        const res = await request(app)
          .get('/')
          .set({ Authorization: `Bearer ${token}` });
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('posts');
        expect(res.body.posts).to.be.an('array');
        expect(res.body.posts[0]).to.be.an('object');
        expect(res.body.posts[0]).to.have.property('id');
        postId = res.body.posts[0].id;
      });
    });

    describe('PUT /', () => {
      it('should update post successfully ', async () => {
        const res = await request(app)
          .put(`/${postId}`)
          .set({ Authorization: `Bearer ${token}` });
        expect(res.status).to.eq(200);
      });
    });

    describe('DELETE /', () => {
      it('should delete post successfully ', async () => {
        const res = await request(app)
          .delete(`/${postId}`)
          .set({ Authorization: `Bearer ${token}` });
        expect(res.status).to.eq(200);
        const post = await Post.findOne({ where: { id: postId } });
        expect(post).to.be.undefined;
      });
    });
  });
});
