import {IQService, IPromise, ITimeoutService, IDeferred} from "angular";

export class PromiserService {

	static id = "promiserService";

	/*@ngInject*/
	constructor(
		private $q: IQService,
		private $timeout: ITimeoutService
	) {	}

    passThrough(): IPromise<any> {
        return this.failingPromise();
    }

    catchError(): IPromise<any> {
        return this.failingPromise()
            .catch((error: any) => {
                console.error(`${error} what an error!`);
                return error;
            });
    }

	propagateExceptionWithError(): IPromise<any> {
		return this.failingPromise()
			.catch((error: any) => {
				console.error(`${error} what an error!`);
                throw new Error();
			});
	}

	propagateExceptionWithReject(): IPromise<any> {
		return this.failingPromise()
			.catch((error: any) => {
				console.error(`${error} what an error!`);
                return this.$q.reject();
			});
	}

	private failingPromise(): IPromise<any> {
		const deferred: IDeferred<any> = this.$q.defer<any>();

		this.$timeout(() => {
			const now = new Date();
			deferred.reject(`rejected at ${now.getTime()}`);
		}, 1000);

		return deferred.promise;
	}
}
