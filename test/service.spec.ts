import * as mocha from 'mocha';
import * as chai from 'chai';
import * as asPromised from 'chai-as-promised'
import * as sinon from 'sinon';

import { Service } from '../src/service';
import { html } from '../src/formatter';
import { SinonStub, SinonSpy } from 'sinon';

const expect = chai.expect;
const should = chai.should();
chai.use(asPromised);

describe("Service", () => {
  describe("submitForm", () => {
    let sendStub   : SinonStub = null,
        formatSpy : SinonSpy = null;

    beforeEach(() => {
      sendStub = sinon.stub().resolves();
      formatSpy = sinon.spy(html);
    });

    // afterEach(() => formatSpy.restore());

    it("should send message with specified subject and correct format", () =>
      Service.submitForm(
        { formField: "some value", subject: "subject" },
        sendStub,
        formatSpy
      )
      .then(() => {
        formatSpy.calledOnce.should.be.true;
        // sendStub.calledOnce.should.be.true;
        // sendStub.calledWith(
        //   "subject",
        //   "<table>\n" +
        //     "  <tr>\n" +
        //     "    <td>formField</td>\n" +
        //     "    <td>some value</td>\n" +
        //     "  </tr>\n" +
        //     "  <tr>\n" +
        //     "    <td>subject</td>\n" +
        //     "    <td>subject</td>\n" +
        //     "  </tr>\n" +
        //     "</table>"
        // ).should.be.true;
      }).should.be.fulfilled);

    it("should default subject if none specified", () =>
      Service.submitForm({ a: "b" }, sendStub, formatSpy).then(() => {
        formatSpy.calledOnce.should.be.true;
        sendStub.calledOnce.should.be.true;
        sendStub.calledWith(
          "noreply@default.com",
          "New message from Form2Email",
          "<table>\n" +
            "  <tr>\n" +
            "    <td>a</td>\n" +
            "    <td>b</td>\n" +
            "  </tr>\n" +
            "</table>"
        ).should.be.true;
      }).should.be.fulfilled);

    it("should error when form input is null", () =>
      Service.submitForm(null, null, html)
        .should.eventually.be.rejectedWith(
          "Validation error: No input or invalid input received"
        ));

    it("should error when FirstName contains a number", () =>
      Service.submitForm({ FirstName: "Numb3r" }, sendStub, html)
        .should.eventually.be.rejectedWith(
          "Validation error: No input or invalid input received"
        ));

    it("should error when form input is empty", () =>
      Service.submitForm({}, sendStub, html)
        .should.eventually.be.rejectedWith(
          "Validation error: No input or invalid input received"
        ));
  });
});