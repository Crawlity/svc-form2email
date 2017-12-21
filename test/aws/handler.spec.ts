// Test framework
import * as mocha from 'mocha';
import * as chai from 'chai';
// import * as asPromised from 'chai-as-promised'

// AWS Lambda
import { Handler, Callback, Context } from 'aws-lambda';

// System under test
import { submitForm } from '../../src/aws/handler';

// Wiring
// chai.use(asPromised);
const expect = chai.expect;
const should = chai.should();

// Tests

describe("handler", () => {
  describe("submitForm", () => {
    it("should wire-up services", () => {
      submitForm(null, null, (error : Error, result : any) => {
        expect(error).to.be.null;
        result.body.should.equal('{"message":"Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!","input":null}');
      })
    });
  });
});
