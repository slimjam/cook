import {SIGNIN} from '../Constants/signinConstants'
	
	const logIn = (signin) => ({
		type: SIGNIN.SIGNIN_START,
		signin
	})
	
	export {
		logIn,
	
	} 