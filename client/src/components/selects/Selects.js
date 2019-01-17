import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const styles = (theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120,
	},
	button: {
		margin: theme.spacing.unit,
	},
	input: {
		display: 'none',
	},
})

class DialogSelect extends React.Component {
    state = {
    	open: false,
    	age: '',
    };

    handleChange = (name) => (event) => {
    	this.setState({ [name]: Number(event.target.value) })
    };

    handleClickOpen = () => {
    	this.setState({ open: true })
    };

    handleClose = () => {
    	this.setState({ open: false })
    };

    render() {
    	const { classes } = this.props

    	return (
    		<div>
    			<Button onClick={this.handleClickOpen}  variant="contained" color="primary" className={classes.button}>Выберете категорию блюда</Button>
    			<Dialog
    				disableBackdropClick
    				disableEscapeKeyDown
    				open={this.state.open}
    				onClose={this.handleClose}
    			>
    				<DialogContent>
    					<form className={classes.container}>
    						<FormControl className={classes.formControl}>
    							<InputLabel htmlFor="age-native-simple">Категория</InputLabel>
    							<Select
    								native
    								value={this.state.age}
    								onChange={this.handleChange('age')}
    								input={<Input id="age-native-simple" />}
    							>
    								<option value="" />
    								<option value={10}>Горячее</option>
    								<option value={20}>Суп</option>
    								<option value={30}>Десерт</option>
									<option value={40}>Гарнир</option>
									<option value={50}>Салаты</option>
									<option value={60}>Закуски</option>
    							</Select>
    						</FormControl>
    					</form>
    				</DialogContent>
    				<DialogActions>
    					<Button onClick={this.handleClose} color="primary">
                           Продолжить
    					</Button>
    					<Button onClick={this.handleClose} color="primary">
                           Готово
    					</Button>
    				</DialogActions>
    			</Dialog>
    		</div>
    	)
    }
}

DialogSelect.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DialogSelect)