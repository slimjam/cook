import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import AccountBox from '@material-ui/icons/AccountBox'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import FilterLink from '../link/link'
const axios = require('axios')

const styles = (theme) => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing.unit,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
		textDecoration: 'none'
	},

	link: {
		textDecoration: 'none'
	},


})
class SignUp extends React.Component {
	constructor(props) {
		super(props)
		this.signUp = this.signUp.bind(this)
		this.handleEmailChange = this.handleEmailChange.bind(this)
		this.handleUsernameChange = this.handleUsernameChange.bind(this)
		this.handlePasswordChange = this.handlePasswordChange.bind(this)
		this.state = {
			email:'',
			username:'',
			password:''
		}
	}
	signUp(){
		axios.post('http://localhost:8080/signup', {
			email: this.state.email,
			username: this.state.username,
			password: this.state.password
		})
			.then(function (response) {
				console.log(response)
			})
			.catch(function (error) {
				console.log(error)
			})
	}
	handleEmailChange(e){
		this.setState({email:e.target.value})
	}
	handleUsernameChange(e){
		this.setState({username:e.target.value})
	}
	handlePasswordChange(e){
		this.setState({password:e.target.value})
	}
	render() {
		const { classes } = this.props

		return (
			<main className={classes.main}>
				<CssBaseline />
				<Paper className={classes.paper}>
					<Avatar className={classes.avatar}>
						<AccountBox />
					</Avatar>
					<Typography component="h1" variant="h5">
						Регистрация
					</Typography>
					<form className={classes.form}>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="email">Email</InputLabel>
							<Input  onChange={this.handleEmailChange} id="email" name="email" autoComplete="email" autoFocus />
						</FormControl>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="email">Имя</InputLabel>
							<Input  onChange={this.handleUsernameChange} id="email" name="email" autoComplete="email" autoFocus />
						</FormControl>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="email">Фамилия</InputLabel>
							<Input  onChange={this.handleUsernameChange} id="email" name="email" autoComplete="email" autoFocus />
						</FormControl>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="email">Возраст</InputLabel>
							<Input  onChange={this.handleUsernameChange} id="email" name="email" autoComplete="email" autoFocus />
						</FormControl>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="password">Пароль</InputLabel>
							<Input onChange={this.handlePasswordChange} name="password" type="password" id="password" autoComplete="current-password" />
						</FormControl>
						
						<FilterLink filter="album" className={classes.link} >
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								onClick={this.signUp}
							>
								Зарегистрироваться
							</Button>
						</FilterLink>
					</form>
				</Paper>
			</main>
		)
	}
}




SignUp.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SignUp)
