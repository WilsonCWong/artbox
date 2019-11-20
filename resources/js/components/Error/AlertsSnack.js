import React, { useState } from 'react';
import styled from 'styled-components';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { amber, green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { Warning, Error, Info, CheckCircle, Close } from '@material-ui/icons';
import * as PropTypes from 'prop-types';

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ErrorMessage = styled.p`
  margin-bottom: 0;
`;

const variantIcon = {
  success: CheckCircle,
  warning: Warning,
  error: Error,
  info: Info,
};

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const AlertsSnack = React.forwardRef(
  (
    {
      as: Component = Snackbar,
      variant,
      onClose: remove = null,
      className,
      messages,
      ...props
    },
    ref,
  ) => {
    const classes = useStyles();
    const Icon = variantIcon[variant];

    const [open, setOpen] = useState(true);

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
    };

    if (messages.length === 0) return null;

    return (
      <Component
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={remove || handleClose}
        open={open}
        autoHideDuration={6000}
      >
        <SnackbarContent
          ref={ref}
          className={`${className} ${classes[variant]}`}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
            <Icon className={`${classes.icon} ${classes.iconVariant}`} />
              <ErrorWrapper>
                {messages.map(err => {
                  return (
                    <ErrorMessage key={err}>{ err }</ErrorMessage>
                  );
                })}
              </ErrorWrapper>
            </span>
          }
          action={[
            <IconButton key="close" aria-label="close" color="inherit" onClick={remove || handleClose}>
              <Close className={classes.icon} />
            </IconButton>,
          ]}
          {...props}
        />
      </Component>
    );
  }
);

AlertsSnack.defaultProps = {
  variant: 'error',
};

AlertsSnack.propTypes = {
  /** @default div */
  as: PropTypes.elementType,
  /**
   * Specify the variant to use for the alert.
   * @default 'error'
   * @type {('error'|'info'|'success'|'warning')}
   */
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
  /**
   * The messages to display as an array of strings.
   */
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * A function to call if the snack is dismissed. The error message being closed is passed to the function.
   */
  onClose: PropTypes.func,

};

export default AlertsSnack;