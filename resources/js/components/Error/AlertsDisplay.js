import React from 'react';
import { Alert } from "react-bootstrap";
import * as PropTypes from 'prop-types';

const AlertsDisplay = React.forwardRef(
  (
    {
      as: Component = 'div',
      variant,
      onClose: remove = null,
      dismissible,
      className,
      messages,
      ...props
    },
    ref,
  ) => {
    if (!variant) return null;
    if (variant === 'error') variant = 'danger';
    return (
      <Component
        ref={ref}
        {...props}
        className={className}
      >
        {messages.map(err => {
          return (
            <Alert key={err} variant={variant} onClose={() => remove(err)} dismissible={dismissible}>
              { err }
            </Alert>
          );
        })}
      </Component>
    );
  }
);

AlertsDisplay.defaultProps = {
  variant: 'danger',
  dismissible: true,
};

AlertsDisplay.propTypes = {
  /** @default div */
  as: PropTypes.elementType,
  /**
   * Specify the variant to use for the alert.
   * @default 'danger'
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark')}
   */
  variant: PropTypes.string,
  /**
   * The messages to display as an array of strings.
   */
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * Determines whether the alert is dismissible or not.
   */
  dismissible: PropTypes.bool,
  /**
   * A function to call if an error is dismissed. The error message being closed is passed to the function.
   */
  onClose: PropTypes.func,

};

export default AlertsDisplay;