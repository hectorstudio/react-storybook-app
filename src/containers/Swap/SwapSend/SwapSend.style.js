import styled from 'styled-components';
import { Icon } from 'antd';
import { palette } from 'styled-theme';
import ContentView from '../../../components/utility/contentView';
import Modal from '../../../components/uielements/modal';
import { media, cleanTag } from '../../../helpers/styleHelper';
import { transition } from '../../../settings/style-util';

export const SwapAssetCard = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ArrowImage = styled.img`
  transform: rotate(90deg);
  ${media.md`
    transform: rotate(0);
  `}
`;

const BaseArrowContainer = cleanTag('div', ['rotate', 'showFrom', 'hideFrom']);
export const ArrowContainer = styled(BaseArrowContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  .swap-arrow-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 54px;
    height: 40px;
    border: 1px solid ${palette('primary', 0)};
    border-radius: 5px;
    cursor: pointer;

    i {
      color: ${palette('primary', 0)};
      ${transition()}
    }

    &:hover {
      i {
        color: #fff;
      }
    }
  }
`;

export const ContentWrapper = styled(ContentView)`
  padding: 18px 0;
  ${media.sm`
    padding: 48px 0;
  `}

  .ant-row {
    display: flex;
    flex-grow: 1;
    ${media.xs`
      flex-direction: column;
    `}
    ${media.sm`
      flex-direction: row;
    `}

    .desktop-view {
      display: none;
      ${media.lg`
        display: block;
      `}
    }
  }

  .swap-detail-panel {
    display: flex;
    flex-direction: column;
    padding: 20px 20px !important;

    .swap-type-selector {
      display: flex;
      justify-content: space-between;

      .btn-wrapper {
        width: calc(50% - 10px);
      }
    }

    .drag-confirm-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-top: 20px;
    }
  }

  .swap-token-panel {
    display: flex;
    flex-direction: column;
    padding: 20px 20px !important;

    .token-search-input {
      margin: 10px 0;
    }

    .coinList-wrapper {
      flex-grow: 1;
      ${media.xs`
        height: 300px;
      `}
      ${media.sm`
        height: 0;
      `}
      .coinList-row {
        padding: 0;
      }
    }
  }
`;

export const CardFormArrowIcon = styled.div`
  &:before {
    content: '⮑';
  }
  color: #ccc;
`;

export const CardFormHolder = styled.div`
  padding-top: 10px;
  margin: 10px 0;

  .addressInput-wrapper {
    margin-left: 4px;
  }

  &.slip-protection {
    .slip-input {
      width: 50px;
      margin: 0 8px;
    }

    button {
      height: 25px;
      min-width: 0px;
      padding-left: 4px;
      padding-right: 4px;
    }
  }
`;

export const CardForm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  > * {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

export const CardFormItem = styled.div`
  flex-grow: 1;
`;

export const CardFormItemError = styled.div`
  font-size: 12px;
`;

export const CardFormItemCloseButton = styled(Icon).attrs({
  type: 'close',
})``;

export const SwapModal = styled(Modal)`
  &.ant-modal {
    width: 420px !important;

    .ant-modal-body {
      padding: 0px;
    }
  }
`;

export const SwapModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .coinData-wrapper {
    padding-left: 0;
    padding-bottom: 4px;
    margin-left: 14px;
  }

  .status-wrapper {
    .status-title {
      padding-top: 0;
    }
    .status-value {
      padding-bottom: 0;
    }
  }

  .swapmodal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 30px 0;
    border-bottom: 1px solid ${palette('border', 0)};

    .timer-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 30px;
    }

    .coin-data-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;

      .coin-data-container {
        display: flex;
        flex-direction: column;

        .coinData-wrapper {
          &:first-child {
            padding-bottom: 20px;
          }
        }
      }
    }
  }

  .swap-info-wrapper {
    padding: 20px 0;
    .hash-address {
      display: flex;
      align-items: center;

      .copy-btn-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;

        border: 1px solid ${palette('primary', 0)};
        border-radius: 6px;
        padding: 1px 4px;
        margin-right: 6px;
        color: ${palette('primary', 0)};
        cursor: pointer;

        .view-btn {
          width: 300px;
          height: 40px;
          margin: 24px 0;
        }
      }

      .label-wrapper {
        width: 100%;
      }
    }
  }
`;

export const PrivateModal = styled(Modal)`
  .ant-modal-body {
    .ant-form-item {
      margin-bottom: 0;
    }
  }
`;

export const SwapStatusPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  margin-top: 120px;
  margin-left: auto;
  margin-right: 10px;

  i {
    transform: rotate(-90deg);
    font-size: 24px;
    color: ${palette('primary', 1)};
    cursor: pointer;

    &:hover {
      font-size: 26px;
    }
  }
`;
