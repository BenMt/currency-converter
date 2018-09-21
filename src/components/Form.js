import React from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import NativeSelect from '@material-ui/core/NativeSelect';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  form: {
    marginTop: theme.spacing.unit,
  }
});

class Form extends React.Component {
  constructor(props) {
    super(props)
    const initAmount = 1;
    // init state with props.base and props.rates from the parent component
    this.state = {
      top: {
        currency: props.base,
        amount: initAmount
      },
      bottom: {
        currency: Object.keys(props.rates)[0],
        amount: this.mathRoundTwoDecimals(initAmount * props.rates[Object.keys(props.rates)[0]])
      }
    };
  }

  mathRoundTwoDecimals = number => Math.round(number * 100) / 100 // avoid to get a lot of decimals

  handleChangeCurrency = position => event => {
    const newCurrency = event.target.value; 

    // update the state
    this.setState(prevState => ({
      [position]: {
        currency: newCurrency,
        amount: this.mathRoundTwoDecimals(
          prevState[position].amount * this.props.rates[newCurrency] / this.props.rates[prevState[position].currency]
        )
      }
    }));
  };

  handleChangeAmount = position => event => {
    const otherPosition = position === 'top'
      ? 'bottom'
      : 'top';
    const newAmount = parseInt(event.target.value || 0, 10); // parseInt to be sure to get number and not string

    // update the state
    this.setState(prevState => ({
      [position]: {
        ...prevState[position],
        amount: newAmount
      },
      [otherPosition]: {
        ...prevState[otherPosition],
        amount: this.mathRoundTwoDecimals(newAmount * this.props.rates[prevState[otherPosition].currency] / this.props.rates[prevState[position].currency])
      }
    }));
  }

  render () {
    const { classes, rates } = this.props;
    const { top, bottom } = this.state;

    return (
      <form className={classes.form}>
        <Grid container spacing={24}>
          <Grid item xs={8} >
            <FormControl margin="normal" required fullWidth>
              <Input 
                type="number" 
                value={top.amount} 
                onChange={this.handleChangeAmount('top')} 
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={4} >
            <FormControl margin="normal" required fullWidth>
            <NativeSelect
                value={top.currency}
                onChange={this.handleChangeCurrency('top')}
                name="top-currency"
              >
                {/* create a list of currencies */}
                {/* Need to use Object.keys as rates is an object, not an array */}
                {Object.keys(rates).map(key => <option key={key} value={key}>{key}</option>)}
              </NativeSelect>
            </FormControl>
          </Grid>
        </Grid>
        
        <Grid container spacing={24}>
          <Grid item xs={8} >
            <FormControl margin="normal" required fullWidth>
              <Input 
                type="number"
                value={bottom.amount} 
                onChange={this.handleChangeAmount('bottom')}
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={4} >
            <FormControl margin="normal" required fullWidth>
            <NativeSelect
                value={bottom.currency}
                onChange={this.handleChangeCurrency('bottom')}
                name="bottom-currency"
              >
                {/* create another list of currencies */}
                {Object.keys(rates).map(key => <option key={key} value={key}>{key}</option>)}
              </NativeSelect>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    )
  }
}

Form.propTypes = {
  base: PropTypes.string.isRequired,
  rates: PropTypes.object.isRequired
}

export default withStyles(styles)(Form)
