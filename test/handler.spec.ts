
// Test framework
import * as mocha from 'mocha';
import * as chai from 'chai';
import * as asPromised from 'chai-as-promised'

// System under test
import { submitForm } from '../handler';

// Wiring
chai.use(asPromised);
const expect = chai.expect;

// Tests

describe("handler", () => {
  describe("submitForm", () => {
    let callback = (error, response) => {
      console.log(error);
      console.log(response);
    }
    submitForm(null, null, callback);
    it("should wire-up services");
  });
});
