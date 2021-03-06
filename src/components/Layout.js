import React from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({ // use Material-ui theme
  layout: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
});

const Layout = ({ children, classes }) => (
  <React.Fragment>
    <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>{children}</Paper>
      </main>
  </React.Fragment>
)

Layout.propTypes = { // check if each props has the good type
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Layout)
