import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import { blueGrey } from '@material-ui/core/colors';
import RecipeReviewCard from '../card/card'
import {Link} from 'react-router-dom';

import classNames from 'classnames'

const styles = (theme) => ({
    avatar: {
        marginLeft:100 ,
        margin: 30,
        width: 200,
        height: 200
        
        
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
    editButton: {
        marginLeft: 100,
        
        width:200
        
      },
      
    orangeAvatar: {
        marginLeft: 1000,
        color: '#fff',
        backgroundColor: blueGrey[500],
    },
    Typography_1:{
        margin:20
    }
   
})
const cards = [1, 2, 3, 4, 5,6,7,8]
function LetterAvatars(props) {
    const { classes } = props;
    return (
      <div> 
          <Grid container justify="left" alignItems="left">
            <Avatar className={classes.avatar}>H</Avatar>
        </Grid>
      <Button className={classes.editButton} variant="outlined" component={Link} to='../EditProfile/EditProfile'  >
        Edit Profile
      </Button>
      <Typography className={classes.Typography_1} variant="title" color="inherit" align='inherit'>Name</Typography>
      <Typography  className={classes.Typography_1} variant="title" color="inherit" >Surname</Typography>
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
    </div>
        
    );
}

LetterAvatars.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LetterAvatars);
