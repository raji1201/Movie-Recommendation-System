/**
 * User Class has the email and password of type string for a user.
 */
export class User {

	/**
   	 * Constructor provides email and password.
   	 * @constructor
   	 * @param {string} email : Email of the user logged in.
   	 * @param {string} password : Password of the user logged in.
   	 */
	constructor(
		public email: string,
		public password: string
	){}
}