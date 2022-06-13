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

import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import server from "@/app";

chai.should();
chai.use(chaiHttp);

describe("GET /list", () => {
  it("Тест должен возвращасть список расчетов", (done) => {
    chai
      .request(server)
      .get("/list")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe("POST /create", () => {
  it("Тест должен успешно создавать расчет", (done) => {
    chai
      .request(server)
      .post("/create")
      .send({
        name: "Автотест",
        count: 1,
        price: 10000,
        categoryId: 2,
        brandId: 2,
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe("GET /parameters", () => {
  it("Тест должен успешно возвращасть список параметров", (done) => {
    chai
      .request(server)
      .get("/parameters")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
describe("GET /graphs", () => {
  it("Тест должен успешно возвращасть графики ЛС", (done) => {
    chai
      .request(server)
      .get("/graphs")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
