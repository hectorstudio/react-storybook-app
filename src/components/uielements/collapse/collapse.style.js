import styled from 'styled-components';
import { palette, key } from 'styled-theme';
import { Collapse } from 'antd';

export const CollapseWrapper = styled(Collapse)`
  &.ant-collapse {
    border: none;
  }
  .ant-collapse-header {
    color: ${palette('text', 0)};
    font-size: ${key('sizes.font.big', '15px')};
    font-weight: bold;
    padding-top: 20px !important;
    padding-bottom: 20px !important;
    letter-spacing: 1px;
  }

  .ant-collapse-header,
  .ant-collapse-content {
    background-color: ${palette('background', 2)};
    border: none;
    .ant-collapse-content-box {
      padding-left: 28px;
    }
  }

  .collapse-panel-wrapper {
    margin-bottom: 24px;
    border: none !important;
    border-radius: 4px;
    background-color: ${palette('background', 2)};
    overflow: hidden;
  }
`;
