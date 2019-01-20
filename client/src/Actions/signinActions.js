import {USER} from '../Constants/signinConstants'


const logIn = (user) => ({
	type: USER.SIGN_IN,
	user
})



export {
	logIn,

}