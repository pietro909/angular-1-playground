import * as angular from "angular-mocks";
import {PromiserService} from "./promiser.service";
import consts from "./index.const";

describe("Given a PromiserService", () => {

    let promiserService: PromiserService;

    beforeEach(() => {
        angular.mock.module(consts.moduleName);
        angular.mock.inject((
            _promiserService_: PromiserService
        ) => {
            promiserService = _promiserService_;
        })
    });

    describe("when call passThrough method", () => {

        it("it should reject the promise", () => {
            expect(promiserService.passThrough()).toBeRejected();
        });

    });
});

