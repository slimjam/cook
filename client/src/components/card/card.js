import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import red from '@material-ui/core/colors/red'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FilterLink from '../link/link'
import { blue } from '@material-ui/core/colors';
import { Link } from 'react-router-dom'

const styles = (theme) => ({
	card: {
		maxWidth: 330,
		marginRight:10,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	actions: {
		display: 'flex',
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: blue[500],
	},
})

class RecipeReviewCard extends React.Component {
    state = { expanded: false };

    render() {
    	const { classes } = this.props

    	return (
    		<Card className={classes.card}>
    			<CardHeader

    				avatar={
						<FilterLink filter="User" >
    					<Avatar aria-label="Recipe" className={classes.avatar} component={Link} to="/user">
                            Us
    					</Avatar>
						</FilterLink>
    				}
    				title="Shrimp and Chorizo Paella"
    				subheader="Январь 14, 2019"
    			/>
    			<CardMedia
    				className={classes.media}
    				image="http://chudo-povar.com/images/lazanya-s-farshem.jpg"
    				title="Paella dish"
    			/>
    			<CardContent>
    				<Typography component="p">
                        This impressive paella is a perfect party dish and a fun meal to cook together with your
                        guests. Add 1 cup of frozen peas along with the mussels, if you like.
    				</Typography>
    			</CardContent>
    			<CardActions className={classes.actions} disableActionSpacing>
				
					
    				<IconButton
    					className={classnames(classes.expand, {
    						[classes.expandOpen]: this.state.expanded,
    					})}
    					aria-expanded={this.state.expanded}
						aria-label="Show more"
						component={Link} to="/recipe"
    				>
    					<ExpandMoreIcon />
    				</IconButton>
					
    			</CardActions>
    		</Card>
    	)
    }
}

RecipeReviewCard.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(RecipeReviewCard)