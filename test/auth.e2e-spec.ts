import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Handles a signup request', () => {
    const email_ = 'gb@gb.com'
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: email_,
        password: '123'
      })
      .expect(201)
      .then((res) => {
        const {id, email } = res.body
        expect(id).toBeDefined()
        expect(email).toEqual(email_)
      })
  })

  it('signup a new user then get the currently logged in user  ', async () =>{
    const email_ = 'gb2@gb.com'
    
    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: email_,
        password: '123'
      })
      .expect(201)
      
    const cookie = response.get('Set-Cookie')

    const {body } = await request(app.getHttpServer())
      .get('/auth/whoAmI')
      .set('Cookie', cookie)
      .expect(200)

    expect(body.email).toEqual(email_)  

  }


  )
})
