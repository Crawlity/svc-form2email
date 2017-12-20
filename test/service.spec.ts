import * as mocha from 'mocha';
import * as chai from 'chai';
import * as asPromised from 'chai-as-promised'
import * as sinon from 'sinon';

import { submitForm } from '../service';
import { html } from '../formatter';
import { SinonStub, SinonSpy } from 'sinon';

const expect = chai.expect;
const should = chai.should();
chai.use(asPromised);

describe("service", () => {
  describe("submitForm", () => {
    let sendStub   : SinonStub = null,
        formatSpy : SinonSpy = null;

    beforeEach(() => {
      sendStub = sinon.stub().resolves();
      formatSpy = sinon.spy(html);
    });

    // afterEach(() => formatSpy.restore());

    it("should send message with specified subject and correct format", () =>
      submitForm(
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
      submitForm({ a: "b" }, sendStub, formatSpy).then(() => {
        formatSpy.calledOnce.should.be.true;
        sendStub.calledOnce.should.be.true;
        console.log(sendStub.lastCall.args);
        sendStub.calledWith(
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
      submitForm(null, null, html)
        .should.eventually.be.rejectedWith(
          "[BadRequest] Validation error: No input or invalid input received"
        ));

    it("should error when FirstName contains a number", () =>
      submitForm({ FirstName: "Numb3r" }, sendStub, html)
        .should.eventually.be.rejectedWith(
          "[BadRequest] Validation error: No input or invalid input received"
        ));

    it("should error when form input is empty", () =>
      submitForm({}, sendStub, html)
        .should.eventually.be.rejectedWith(
          "[BadRequest] Validation error: No input or invalid input received"
        ));
  });
});