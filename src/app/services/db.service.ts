// IMPORTING THE ANGULAR MODULES FOR PERFORMING BASIC ANGULAR FRAMEWORK OPERATIONS.
import {Injectable} from '@angular/core';
// IMPORTING THE ANGULAR HTTP FOR HTTP REQUESTS.
import {HttpClient} from "@angular/common/http";
// IMPORTING THE ANGULAR SUBJECT TO USE AS AN OBSERVABLE.
import {Subject} from "rxjs";
// IMPORTING THE LK ENVIRONMENT FILE TO GET THE STATIC VARIABLES LIKE SERVER URL.
import {environment} from "src/environments/environment";
import {ApiService} from "../../core/api.service"

// @Injectable DECLARES THIS AS A SERVICE SO THAT WE CAN INJECT THIS SERVICE INTO ANY OTHER COMPONENT OR SERVICE.
@Injectable
({
	providedIn: 'root'
})

// DECLARING THE DbService CLASS WITH EXPORT SO THAT WE CAN IMPORT THIS SERVICE INTO ANY OTHER COMPONENT OR SERVICE.
export class DbService
{
	// URL OF THE NODE SERVER WHERE WE WILL SEND REQUESTS TO COMMUNICATE WITH DATABASE.
	public apiURL = environment.apiURL;

	// ALL INITIAL STATIC DATA WILL BE LOADED INTO THIS ARRAY AT THE START OF APP INITIALIZATION
	public appStaticData: any;

	// STORE DATA FROM STATIC TABLES. WE ARE STORING ALL THIS DATA INTO THESE VARIABLES SO WE DON'T
	// HAVE TO GET THIS DATA FROM DATABASE AGAIN AND AGAIN.
	public sitevariables:any[] = []; // DATA FROM SITEVARIABLE TABLE.
	public sitemessages:any[] = []; // DATA FROM MESSAGE TABLE.
	public translations:any[] = []; // DATA FROM TRANSLATIONS TABLE.

	// OBSERVABLE THAT WILL BE TRIGGERED WHEN WE RECEIVE INITIAL DATA FROM THE SERVER.
	// THIS INITIAL DATA THAT CONTAINS SITEVARIABLES, MESSAGES AND JUMPCODES IS REQUIRED TO RUN THE APP,
	// SO IT WILL BE THE FIRST CALL TO MAKE TO THE DATABASE AS SOON AS THE APP LOADS.
	public appStaticDataObs = new Subject <any>();


	// CLASS CONSTRUCTOR, THIS WILL BE FIRST FUNCTION TO BE EXECUTED WHEN THIS CLASS LOADS.
	// HERE WE WILL TELL ANGULAR TO INJECT A DEPENDENCY BY SPECIFYING A CONSTRUCTOR
	// PARAMETER WITH THE DEPENDENCY TYPE.
	constructor
	(
	    private http: HttpClient,
		private apiService: ApiService
	)
	{}

	// PERFORM A GET REQUEST
	public performGetRequest(url: string)
	{
		return this.http.get (this.apiURL+url);
	}

	// PERFORM POST REQUEST
	public performPostRequest(url: string, dataObj: any)
	{
		return this.http.post (this.apiURL+url, dataObj);
	}

	// GET ALL STATIC DATA FROM DATABASE. FOR EXAMPLE TRASNLASTIONS.
	// WE NEED THIS DATA TO START THE APP.
	public getAppInitialData()
	{
		// // SENDING REQUEST TO SERVER TO GET STATIC DATA.
		// this.http.get (this.apiURL + '/translation/multi-translation').subscribe ( (response: any) =>
		// {
		// 	// IF WE SUCCESSFULLY GOT THE DATA FROM DATABASE . . .
		// 	if ( Object.keys (response["data"]).length > 0)
		// 	{
		// 		console.log ("translations", response["data"])
		// 		this.translations = response["data"]; // . . .STORE IT INTO A CLASS VARIABLE.
		// 		sessionStorage.setItem ('translations', JSON.stringify (response?.data));

		// 		// TRIGGERING THE OBSERVABLE SO THE APP KNOWS THAT STATIC DATA IS AVAILABLE NOW.
		// 		this.appStaticDataObs.next (this.translations);
		// 	}
		// });
	}
}
