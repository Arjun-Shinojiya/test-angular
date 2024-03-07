// IMPORTING THE ANGULAR MODULES FOR PERFORMING BASIC ANGULAR FRAMEWORK OPERATIONS.
import {Injectable, Injector} from '@angular/core';
// IMPORTING THE LK HELPER SERVICE TO GET ACCESS TO THE GLOBAL DATA AND SERVICES
// SO THAT WE CAN USE THE GLOBAL DATA AND FUNCTIONS LIKE MESSAGING AND SITE VARIABLES.
import {HelperService} from "./helper.service";
import {DbService} from "./db.service"


// @Injectable DECLARES THIS AS A SERVICE SO THAT WE CAN INJECT THIS SERVICE INTO ANY OTHER COMPONENT OR SERVICE.
@Injectable
({
	providedIn: "root"
})

// DECLARING THE InitProvider CLASS WITH EXPORT SO THAT WE CAN IMPORT THIS SERVICE INTO ANY OTHER COMPONENT OR SERVICE.
export class InitProvider
{
	// CLASS CONSTRUCTOR, THIS WILL BE THE FIRST FUNCTION TO BE EXECUTED WHEN THIS CLASS LOADS.
	// HERE WE WILL TELL ANGULAR TO INJECT A DEPENDENCY BY SPECIFYING A CONSTRUCTOR
	// PARAMETER WITH THE DEPENDENCY TYPE.
	constructor
	(
		private injector:Injector,
		public dbService: DbService,
		public helper: HelperService,
	)
	{
	}

	// THIS FUNCTION IS CALLED ASYNCHRONOUSLY WHILE THE APPLICATION IS INITIALIZING, AND
	// RETRIEVES ALL STATIC DATA LIKE TRANSLATIONS ETC
	public async load()
	{
		return new Promise ((resolve, reject) =>
		{
			// GETTING SITE-VARIABLE, MESSAGES AND TRANSLATION FROM DATABASE.
			this.dbService.getAppInitialData();
			resolve(true)
			// SUBSCRIBING TO THE RETRIEVAL OF DATA, MENTIONED ABOVE, FROM DATABASE.
			// this.dbService.appStaticDataObs.subscribe (data =>
			// {
			// 	console.log('getAppInitialData',data);
			// 	console.log('Resolving initial provider. Now angular will load');
			// 	// GET THE TRANSLATIONS AND STORE IN THE HELPER.TRANSLATIONS.
			// 	this.helper.translations = data;

			// 	// CHANGE THE STATIC DATA LOADED FLAG TO TRUE.
			// 	this.helper.staticDataLoaded = true;
				

			// 	// RESOLVING THE PROMISE.
			// 	resolve (true);
			// });
		});
	}

}
