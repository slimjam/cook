import React from 'react'
import MarkDown from '../markdown/markdown'
import DialogSelect from '../selects/Selects'
import withStyles from "@material-ui/core/styles/withStyles"
import IntegrationReactSelect from  '../ingridients/ingridients'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 1,
		marginRight: theme.spacing.unit * 1,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 1000,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	button: {
		margin: theme.spacing.unit,
	},
})

class CreateRecipe extends React.Component {
	render() {
	const { classes } = this.props
	return (
	<div>
		<FormControl margin="normal" required fullWidth>
			<InputLabel >Заголовок</InputLabel>
			<Input autoFocus />
		</FormControl>
		<FormControl margin="normal" required fullWidth>
			<InputLabel >Краткое содержание</InputLabel>
			<Input />
		</FormControl>
		<IntegrationReactSelect/>
		<DialogSelect/>
		<main className={classes.main}>
		<MarkDown/>
		</main>
		<Button variant={'contained'} color="primary">Сохранить</Button>

	</div>

)
}}

export default  withStyles(styles)(CreateRecipe)