import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { LogoWrapper } from './logo.style';
import { logoData } from './data';

class Logo extends Component {
  render() {
    const { name, type, ...otherProps } = this.props;
    const logoURL = logoData[name][type];

    return (
      <LogoWrapper className="logo-wrapper" {...otherProps}>
        <img src={logoURL} alt="bepswap-logo" />
      </LogoWrapper>
    );
  }
}

Logo.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
};

Logo.defaultProps = {
  type: 'long',
};

export default Logo;
