import * as angular from "angular";
import "angular-mocks";
import "angular-1-playground";
import {PromiserService} from "./promiser.service";
import consts from "./index.const";

describe("Given a promise always rejected", () => {

    let promiserService: PromiserService;
""
    beforeEach(() => {
        angular.mock.module(consts.moduleName);
        angular.mock.inject((
            _promiserService_: PromiserService
        ) => {
            promiserService = _promiserService_;
        });
    });

    describe("when call passThrough method", () => {

        it("it should reject the promise", () => {
            expect(promiserService.passThrough()).toBeRejected();
        });

    });

    describe("when call catchError method", () => {

        it("it should resolve the promise", () => {
            expect(promiserService.catchError()).toBeResolved();
        });

    });

    describe("when call propagateExceptionWithError method", () => {

        it("it should resolve the promise", () => {
            expect(promiserService.propagateExceptionWithError()).toBeResolved();
        });

    });

    describe("when call propagateExceptionWithReject method", () => {

        it("it should reject the promise", () => {
            expect(promiserService.propagateExceptionWithReject()).toBeRejected();
        });

    });
});

