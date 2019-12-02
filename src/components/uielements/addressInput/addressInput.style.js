import styled from 'styled-components';
import { palette } from 'styled-theme';
import { transition } from '../../../settings/style-util';

export const AddressInputWrapper = styled.div`
  display: flex;

  ${transition()}

  .addressInput-icon {
    margin-top: 10px;
    width: 21px;
    height: 21px;
    border: none;
    border-radius: 50%;
    color: #fff;
    background: ${props =>
      props.status ? palette('error', 0) : palette('primary', 1)};
    cursor: pointer;

    i {
      position: relative;
      top: 1px;
      left: 3px;
      color: #fff;
      font-size: 15px;
      font-weight: bold;
    }
  }

  .address-input {
    margin-top: 8px;
    margin-left: 10px;
  }
`;
