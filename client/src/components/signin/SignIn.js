import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import FilterLink from '../link/link'
import {logIn} from '../../Actions/signinActions'
import connect from 'react-redux/es/connect/connect'
import axios from 'axios'
import {Link} from 'react-router-dom';
import '../../assets/SignIn.css'




class SignIn extends React.Component {

	constructor(props) {
		super(props)
		this.signIn = this.signIn.bind(this)
		this.handleEmailChange = this.handleEmailChange.bind(this)
		this.handlePasswordChange = this.handlePasswordChange.bind(this)
		this.state = {
			email:'',
			password:''
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
		return (
			<main className={'main'}>
				<CssBaseline />
				<Paper className={'paper'}>
					<Avatar className={'avatar'}>
						<LockIcon />
					</Avatar>
					<Typography component="h1" variant="h5" className={'typographysign'}>
						Вход
					</Typography>
					<form className={'form'}>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="email">Адрес электронной почты</InputLabel>
							<Input  onChange={this.handleEmailChange} id="email" name="email" autoComplete="email" autoFocus />
						</FormControl>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="password">Пароль</InputLabel>
							<Input onChange={this.handlePasswordChange} name="password" type="password" id="password" autoComplete="current-password" />
						</FormControl>
						<Button  variant="outlined" className={'buttonsign'} color="primary" component={Link} to="../SignUp/SignUp">
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

function mapStateToProps(state) {
	return {
		user: state.user

	}
}

export default connect(mapStateToProps)(SignIn)