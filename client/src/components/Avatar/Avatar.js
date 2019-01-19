import React from 'react'
	import Avatar from '@material-ui/core/Avatar'
	import red from '@material-ui/core/colors/red'
	import FilterLink from '../link/link'
	import PropTypes from 'prop-types'
	import {withStyles} from '@material-ui/core'
	
	const styles = (theme) => ({
		avatar: {
			backgroundColor: red[500],
		},
	})
	
	class avatar extends React.Component {
	
		render() {
			const { classes } = this.props
	
			return (
					<FilterLink filter="User" >
						<Avatar  className={classes.avatar}>
	                                R
						</Avatar>
					</FilterLink>
			)}}
	
	
	avatar.propTypes = {
		classes: PropTypes.object.isRequired,
	}
	
	export default withStyles(styles)(avatar)