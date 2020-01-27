import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TableWrapper } from './table.style';

class Table extends Component {
  render() {
    const { className, ...props } = this.props;

    return (
      <TableWrapper
        className={`table-wrapper ${className}`}
        pagination={false}
        {...props}
      />
    );
  }
}

Table.propTypes = {
  className: PropTypes.string,
};

Table.defaultProps = {
  className: '',
};

export default Table;
