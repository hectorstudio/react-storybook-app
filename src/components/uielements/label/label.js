import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { LabelWrapper } from './label.style';

class Label extends Component {
  render() {
    const { children, className = '', ...props } = this.props;

    return (
      <LabelWrapper className={`label-wrapper ${className}`} {...props}>
        {children}
      </LabelWrapper>
    );
  }
}

Label.propTypes = {
  size: PropTypes.oneOf(['tiny', 'small', 'normal', 'big', 'large']),
  color: PropTypes.oneOf([
    'primary',
    'success',
    'warning',
    'error',
    'normal',
    'light',
    'dark',
    'gray',
    'input',
    'white',
  ]),
  weight: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
};

Label.defaultProps = {
  size: 'normal',
  color: 'normal',
  weight: 'normal',
};

export default Label;
