import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

import { CoinPairWrapper } from './coinPair.style';
import CoinIcon from '../coinIcon';

class CoinPair extends Component {
  render() {
    const { from, to, className, ...props } = this.props;

    return (
      <CoinPairWrapper className={`coinPair-wrapper ${className}`} {...props}>
        <div className="coin-data">
          <CoinIcon type={from} />
        </div>
        <Icon className="arrow-icon" type="caret-right" />
        <div className="coin-data">
          <CoinIcon type={to} />
        </div>
      </CoinPairWrapper>
    );
  }
}

CoinPair.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'big']),
  className: PropTypes.string,
};

CoinPair.defaultProps = {
  size: 'big',
  className: '',
};

export default CoinPair;
