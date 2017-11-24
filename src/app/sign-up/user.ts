export class User {
	/**
   * Constructor provides fullname,email,password,verifyPassword on object instantiation.
   * @constructor
   */
	constructor(
		public fullName: string,
		public email: string,
		public password: string,
		public verifyPassword: string
	){}
}					