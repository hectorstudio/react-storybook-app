import styled from 'styled-components';
import { palette, key } from 'styled-theme';

const fontSettings = {
  tiny: {
    size: key('sizes.font.tiny', '8px'),
    spacing: '0.36px',
  },
  small: {
    size: key('sizes.font.small', '10px'),
    spacing: '0.42px',
  },
  normal: {
    size: key('sizes.font.normal', '12px'),
    spacing: '0.37px',
  },
  big: {
    size: key('sizes.font.big', '15px'),
    spacing: '1px',
  },
  large: {
    size: key('sizes.font.large', '18px'),
    spacing: '1px',
  },
};

const colors = {
  primary: palette('primary', 0),
  success: palette('success', 0),
  warning: palette('warning', 0),
  error: palette('error', 0),
  normal: palette('text', 0),
  light: palette('text', 3),
  dark: palette('text', 2),
  gray: palette('text', 4),
  input: palette('text', 5),
  white: '#fff',
};

export const LabelWrapper = styled.div`
  padding: 10px 0;
  font-size: ${props => fontSettings[props.size].size};
  font-weight: ${props => props.weight};
  letter-spacing: ${props => fontSettings[props.size].spacing};
  color: ${props => colors[props.color]};
  cursor: ${props => props.onClick && 'pointer'};
`;
