import {IQService, IPromise, ITimeoutService, IDeferred} from "angular";

export class PromiserService {

	static id = "promiserService";

	/*@ngInject*/
	constructor(
		private $q: IQService,
		private $timeout: ITimeoutService
	) {	}

    /**
     * Just return the plain promise without interacting with it
     * @returns {IPromise<any>}
     */
    passThrough(): IPromise<any> {
        return this.failingPromise();
    }

    /**
     * Return the promise catching the failure
     * @returns {IPromise<TResult>}
     */
    catchError(): IPromise<any> {
        return this.failingPromise()
            .catch((error: any) => {
                console.error(`${error} what an error!`);
                return error;
            });
    }

    /**
     * Return the promise catching the failure and throwing a new exception
     * @returns {IPromise<TResult>}
     */
	propagateExceptionWithError(): IPromise<any> {
		return this.failingPromise()
			.catch((error: any) => {
				console.error(`${error} what an error!`);
                throw new Error();
			});
	}

    /**
     * Return the promise catching the failure and rejecting
     * @returns {IPromise<any>}
     */
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
