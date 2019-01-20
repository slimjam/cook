import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class FormControlLabelPosition extends React.Component {
  state = {
    value: 'female',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Выбор темы</FormLabel>
        <RadioGroup
          aria-label="position"
          name="position"
          value={this.state.value}
          onChange={this.handleChange}
          row
        >
          <FormControlLabel
            value="sugar"
            control={<Radio color="primary" />}
            label="Сладкая"
            labelPlacement="top"
          />
           <FormControlLabel
            value="veget"
            control={<Radio color="primary" />}
            label="Овощная"
            labelPlacement="top"
          />
        </RadioGroup>
      </FormControl>
    );
  }
}

export default FormControlLabelPosition;