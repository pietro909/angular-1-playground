import * as ng from "angular";
import consts from "./index.const";
import {PromiserService} from "./promiser.service";

export const angular1PlaygroundModule = ng.module(
	consts.moduleName,
	[]
);

angular1PlaygroundModule.service(PromiserService.id, PromiserService);

export default angular1PlaygroundModule;
