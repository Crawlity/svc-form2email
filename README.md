# Form2Email

A [Serverless](https://serverless.com/) microservice written in [TypeScript](http://www.typescriptlang.org/) to email the contents of a web form (or any data send via HTTP POST).

## User Guide

TODO: Deployment instructions

## Developer Guide

Fork me, change me, then submit a pull request. Please follow conventions for faster responses and approvals.

### Testing

* Run `npm test` to execute tests
* Test locally using `serverless invoke local -f submitForm -l -d "{ \"body\":\"hello=world&subject=local%20test\" }"`
* Test in production using `serverless invoke -f submitForm -l -d "{ \"hello\":\"world\", \"subject\":\"production test\" }"`

### Conventions

* Use TDD
* Tests follow [Mocha](https://mochajs.org/#assertions) and [Chai](http://chaijs.com/api/bdd/) conventions
* `handler.js` wires up platform-specific dependencies and injects them to the actual service
* `service.js` provides the actual functionality for the service

### To-do

* Add swagger, possibly using https://github.com/thiagobustamante/typescript-rest-swagger and/or https://github.com/Reckon-Limited/serverless_swagger and/or https://www.dropsource.com/blog/serverless-rest-api/.