import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { palette } from 'styled-theme';
import { Icon, Input, Divider } from 'antd';
import Label from '../../label';
import { cleanTag } from '../../../../helpers/styleHelper';
import Coin from '../coin';

export const CoinCardWrapper = styled.div`
  min-width: 350px;
  .title-label {
    font-style: italic;
  }

  .selection-wrapper {
    width: auto;
    margin-top: 10px;

    .btn-wrapper {
      width: 20%;
    }
  }
`;

export const CardBorderWrapper = styled.div`
  display: flex;
  flex-direction: column;

  border: 1px solid ${palette('border', 0)};
  border-radius: 3px;
  background-color: #fff;
`;

export const CardTopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-width: 250px;
`;

export const AssetCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconBase = cleanTag(Icon, ['open']);
export const DropdownIcon = styled(IconBase)`
  transition: transform 0.2s ease-in-out;
  ${({ open }) =>
    open ? 'transform: rotate(180deg);' : 'transform: rotate(0);'}
  font-size: 18px;

  &.caret-down {
    font-size: 22px;
    color: ${palette('primary', 0)};
  }
`;

export const DropdownIconHolder = styled.div`
  transition: transform 0.2s ease-in-out;
  padding-top: 5px;
`;

export const AssetNameLabel = styled(Label).attrs({
  size: 'normal',
  weight: 'bold',
})`
  font-size: 14px;
  letter-spacing: 0.75px;
  transition: transform 0.2s ease-in-out;
  text-transform: uppercase;
  padding: 8px 16px 6px 16px;
`;

export const CoinDropdownCoin = styled(Coin)`
  width: 45px;
  height: 45px;
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
`;

export const CoinDropdownButton = styled.button`
  ${({ disabled }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    background: transparent;
    border: none;
    cursor: pointer;
    &:focus {
      outline: none;
    }
    > * {
      margin-right: 10px;
    }

    ${!disabled
      ? css`
          &:hover {
            ${CoinDropdownCoin} {
              opacity: 0.8;
            }
            ${AssetNameLabel} {
              transform: translateY(1px);
            }
            ${DropdownIconHolder} {
              transform: translateY(-1px);
            }
          }
        `
      : ''};
  `}
`;

export const CoinDropdownVerticalColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 32px;
`;

export const AssetData = styled.div.attrs({ className: 'asset-data' })`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 12px 16px;

  .asset-amount-label {
    height: 24px;
  }
`;

export const VerticalDivider = styled(Divider).attrs({
  type: 'vertical',
})`
  &.ant-divider {
    margin: 0 10px 0 0;
    height: 20px;
  }
`;

export const HorizontalDivider = styled(Divider)`
  &.ant-divider {
    margin: ${props => (props.color === 'primary' ? '4px 0' : '2px 0')};

    background: ${props =>
      props.color === 'primary' ? palette('success', 0) : palette('border', 0)};
  }
`;

export const FooterLabel = styled(Label).attrs({
  size: 'normal',
  color: 'gray',
  weight: 'normal',
})`
  letter-spacing: 0.416667px;
  padding: 0;
`;

function AutofocusInput(props) {
  const handleFocus = React.useCallback(
    event => {
      event.target.select();
      if (props.onFocus) props.onFocus(event);
    },
    [props],
  );

  return <Input {...props} onFocus={handleFocus} />;
}

AutofocusInput.propTypes = {
  onFocus: PropTypes.func,
};
