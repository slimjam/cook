import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import AccountBox from '@material-ui/icons/AccountBox'
import InputLabel from '@material-ui/core/InputLabel'
//import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import FilterLink from '../link/link'
import {logIn} from '../../Actions/signinActions'
import {Link} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect'
const axios = require('axios')

const styles = (theme) => ({
	main: {
		width: 'auto',
		display: 'block',
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	heroButtons: {
		marginTop: theme.spacing.unit * 4,
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
class SignIn extends React.Component {
	constructor(props) {
		super(props)
		this.signIn = this.signIn.bind(this)
		this.handleEmailChange = this.handleEmailChange.bind(this)
		this.handlePasswordChange = this.handlePasswordChange.bind(this)
		this.state = {
			email:'',
			password:'',
			token: ''
		}
	}
	signIn(){
		axios.post('http://localhost:3001/signIn', {
			email: this.state.email,
			password: this.state.password
		})
			.then(function (res) {
				this.props.dispatch(logIn(JSON.parse(res.data)))
			})
			axios.get('http://localhost:3001/signIn')
				.then(function (response) {
					this.props.dispatch(logIn('JSON.parse(response.data)'))
				})
				.catch(function (error) {
					console.log(error)
				})
	}
	handleEmailChange(e){
		this.setState({email:e.target.value})
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
						Вход
					</Typography>
					<form className={classes.form}>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="email">Email</InputLabel>
							<Input  onChange={this.handleEmailChange} id="email" name="email" autoComplete="email" autoFocus />
						</FormControl>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="password">Пароль</InputLabel>
							<Input onChange={this.handlePasswordChange} name="password" type="password" id="password" autoComplete="current-password" />
						</FormControl>
						<Button  variant="outlined" color="primary" component={Link} to="../SignUp/SignUp">
				Регистрация
				</Button>
						<FilterLink filter="../main"  >
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
	
									onClick={this.signIn}
								>
									Войти
								</Button>
								{console.log(this.props)}
							</FilterLink>
					</form>
				</Paper>
			</main>
		)
	}
}




SignIn.propTypes = {
	classes: PropTypes.object.isRequired,
	
}

export default withStyles(styles)(SignIn)
