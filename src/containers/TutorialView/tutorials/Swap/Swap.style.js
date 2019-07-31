import styled from 'styled-components';
import { palette } from 'styled-theme';

export const ContentWrapper = styled.div`
  display: flex;
  flex: auto;
  & > .ant-row {
    display: flex;
    flex: auto;
  }

  .intro-text {
    padding: 20px 20px !important;
    border-right: 1px solid ${palette('border', 0)};

    .label-wrapper {
      padding: 6px 0;
    }

    .try-btn {
      margin-top: 14px;
    }
  }

  .tutorial-content {
    display: flex;
    flex-direction: column;

    .tutorial-flow {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }

    .swap-flow-wrapper {
      width: 400px;
      padding: 30px 0;

      .label-wrapper {
        &.header-label {
          padding-top: 0px;
          letter-spacing: 2px;
        }

        &.contains-tooltip {
          justify-content: space-between;
        }
      }

      & > div {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .swap-flow-diagram {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        padding: 20px 0;
      }
    }

    .swap-play-wrapper {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 10px 20px;

      .token-receiver-tooltip {
        margin-left: auto;
      }
    }
  }

  .bottom-nav-button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px;

    button {
      width: 130px;
    }
  }
`;
