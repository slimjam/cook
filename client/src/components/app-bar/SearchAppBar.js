import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { fade } from '@material-ui/core/styles/colorManipulator'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import {Link} from 'react-router-dom';

const styles = (theme) => ({
	root: {
		width: '100%',
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 50,
	},
	buttonMaLog:{
       magrin: 10
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.35),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: 30,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing.unit,
			width: 'auto',
		},
	},
	searchIcon: {
		width: theme.spacing.unit * 10,
		height: '100%',
		position: "absolute",
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
		width: '100%',
	},
	inputInput: {
		paddingTop: theme.spacing.unit,
		paddingRight: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
		paddingLeft: theme.spacing.unit * 10,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: 180,
			'&:focus': {
				width: 200,
			},
		},
	},
})

function SearchAppBar(props) {
	const { classes } = props

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
						<MenuIcon />
					</IconButton>
					<Typography className={classes.title} variant="h6" color="inherit" noWrap>
                       Cook Site
					</Typography>

					
					<div className={classes.grow} />
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Поиск"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
						/>
				</div>
				<Button className={classes.buttonMaLog} variant="outlined" color="inherit" component={Link} to="../Signin/SignIn">
				Вход
				</Button>
				<Button variant="outlined" color="inherit" component={Link} to="../Main/main">
				Главная страница
				</Button>
				
				</Toolbar>
			</AppBar>
		</div>
	)
}

SearchAppBar.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SearchAppBar)