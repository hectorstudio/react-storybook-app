import styled from 'styled-components';
import { palette } from 'styled-theme';
import { transition } from '../../../../settings/style-util';

export const TokenInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 312px;
  height: 60px;
  padding: 9px;
  border: 1px solid ${palette('border', 0)};
  border-radius: 2px;
  text-transform: uppercase;
  ${transition()};

  &:hover {
    border-color: ${palette('success', 0)};
  }

  .token-input-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .token-input-title {
      font-size: 11px;
      color: ${palette('text', 3)};
      letter-spacing: 1px;
    }

    .token-input-header-label {
      font-size: 11px;
      color: ${palette('success', 1)};
      letter-spacing: 1px;
    }
  }

  .token-input-content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .token-amount-label {
      width: 50%;
      font-size: 12px;
      color: ${palette('text', 3)};
      letter-spacing: 1px;
      text-align: right;
    }
  }
`;
