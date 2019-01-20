import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import RecipeReviewCard from '../card/card'

const styles = (theme) => ({
	appBar: {
		position: 'relative',
	},
	icon: {
		marginRight: theme.spacing.unit * 2,
	},
	heroUnit: {
		backgroundColor: theme.palette.background.paper,
	},
	heroContent: {
		maxWidth: 600,
		margin: '0 auto',
		padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
	},
	heroButtons: {
		marginTop: theme.spacing.unit * 4,
	},
	layout: {
		width: 'auto',
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
			width: 1100,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	cardGrid: {
		padding: `${theme.spacing.unit * 8}px 0`,
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'row',
		padding:10,
	},
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	cardContent: {
		flexGrow: 1,
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing.unit * 10,
	},
})

const cards = [1, 2, 3, 4, 5,6]

function Album(props) {
	const { classes } = props

	return (
		<React.Fragment>
			<CssBaseline />
			<main>
				{/* Hero unit */}
				<div className={classes.heroUnit}>
					<div className={classes.heroContent}>
						<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Главная страница
						</Typography>
						<Typography variant="h6" align="center" color="textSecondary" paragraph>
                            Это сайт для заядлых кулинаров
						</Typography>
						
					</div>
				</div>
				<div className={classNames(classes.layout, classes.cardGrid)}>
					{/* End hero unit */}
					<Grid container spacing={10}>
						{cards.map(() => (
							<div className={classes.card}>
								<RecipeReviewCard/>
							</div>
						))}
					</Grid>
				</div>
			</main>
		</React.Fragment>
	)
}

Album.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Album)