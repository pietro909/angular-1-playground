import {IQService, IPromise, ITimeoutService, IDeferred} from "angular";

export class Promiser {

	static id = "promiserService";

	/*@ngInject*/
	constructor(
		private $q: IQService,
		private $timeout: ITimeoutService
	) {	}

	propagateExceptionWithError(): IPromise<string> {
		return this.failingPromise()
			.then((message: string) => {
				// doing stuff with the message
				return message;
			})
			.catch((error: any) => {
				console.error(`${error} what an error!`);
				// throw new Error();
			});
	}

	private failingPromise(): IPromise<string> {
		const deferred: IDeferred<string> = this.$q.defer<string>();

		this.$timeout(() => {
			const now = new Date();
			deferred.reject(`rejected at ${now.getTime()}`);
		}, 1000);

		return deferred.promise;
	}
}