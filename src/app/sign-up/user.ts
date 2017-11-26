/**
 * User Class has the name, email, password and verify password of type string for a user.
 */
export class User {
	
	/**
   	 * Constructor provides email and password.
   	 * @constructor
   	 * @param {string} fullName : Full name of the user signed up.
   	 * @param {string} email : Email of the user signed up.
   	 * @param {string} password : Password of the user signed up.
   	 * @param {string} verifyPassword : Verify password of the user signed up.
   	 */
	constructor(
		public fullName: string,
		public email: string,
		public password: string,
		public verifyPassword: string
	){}
}					