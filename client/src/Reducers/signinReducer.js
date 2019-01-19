const signin = (state = [], action) => {
	switch (action.type) {
	case 'SIGNIN_START':
		state = action

		return state

	default:
		return state
	}
}

export default signin