import styled from 'styled-components';
import { palette } from 'styled-theme';
import ContentView from '../../../components/utility/contentView';
import { media } from '../../../helpers/styleHelper';

export const ContentWrapper = styled(ContentView)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${palette('background', 2)};
  padding: 0;

  .add-new-pool {
    display: flex;
    align-items: center;
    padding-top: 20px;
    cursor: pointer;
    width: 160px;

    .label-wrapper {
      padding-left: 20px;
    }
  }

  .pool-list-view {
    display: none;
    ${media.sm`
      display: block;
    `}

    &.mobile-view {
      display: block;
      ${media.sm`
        display: none;
      `}
    }

    padding-top: 20px;
    .pool-card {
      margin-bottom: 10px;
    }
  }
`;
