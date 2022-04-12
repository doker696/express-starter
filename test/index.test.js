// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import { describe, it } from 'mocha';

// import server from '@/app';

// chai.should();
// chai.use(chaiHttp);

// describe('GET /products', () => {
//   it('should return homepage with 200 status code', (done) => {
//     done();
//   });
// });
// describe('GET /brands', () => {
//   it('should return homepage with 200 status code', (done) => {
//     chai.request(server)
//       .get('/')
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       });
//   });
// });
// describe('GET /categories', () => {
//   it('should return homepage with 200 status code', (done) => {
//     chai.request(server)
//       .get('/')
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       });
//   });
// });


import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';

import server from '@/app';

chai.should();
chai.use(chaiHttp);

describe('GET /orders', () => {
  it('should return list of orders', (done) => {
    chai.request(server)
      .get('/order')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('GET /me', () => {
  it('should return profile info authorized user', (done) => {
    chai.request(server)
      .get('/me')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('POST /product', () => {
  it('should return succes when creating product', (done) => {
    chai.request(server)
      .get('/product')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('GET /', () => {
  it('should return homepage with 200 status code', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
