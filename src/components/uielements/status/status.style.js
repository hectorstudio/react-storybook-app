import styled from 'styled-components';

export const StatusWrapper = styled.div`
  display: flex;
  flex-direction: ${props =>
    props.direction === 'horizontal' ? 'row' : 'column'};
  text-transform: uppercase;
  letter-spacing: 1px;

  .status-title {
    padding: 11px 0;
    ${props =>
      props.direction === 'horizontal'
        ? 'padding-right: 4px'
        : 'padding-bottom: 4px'};
  }
  .status-value {
    ${props =>
      props.direction === 'horizontal'
        ? 'padding-left: 4px'
        : 'padding-top: 4px'};
    font-size: 13px;
    text-transform: uppercase;
  }
`;
