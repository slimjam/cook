import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Example from './Comment'
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    weight: 1000,
    height: 500
  },
});

function PaperSheet(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h3" component="h3">
          Пицца
        </Typography>
        
        <Typography component="p">
        В теплом молоке размешай дрожжи и сахар и оставь в теплом месте на 10-15 минут.
Когда появятся пузырьки, вылей опару в просеянную муку и туда же добавь яйцо. Посоли, добавь специи и вымеси тесто до однородности.
Раскатай тесто в круг по размеру формы.
Выложи тесто в смазанную жиром форму или противень. Чтобы края пиццы были красивыми, защипни их вовнутрь.

        </Typography>
      </Paper>
      <Example/>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);