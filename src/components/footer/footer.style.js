import styled from 'styled-components';
import { size, key, palette } from 'styled-theme';
import { Layout } from 'antd';
import { media } from '../../helpers/styleHelper';

export const FooterItem = styled.div``;

export const FooterContainer = styled(Layout.Footer).attrs({
  style: { padding: 0 },
})`
  padding: 0;

  ${media.sm`
    padding: 24px 0px;
  `}
`;

export const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  padding: 40px 20px;

  > ${FooterItem} {
    margin-bottom: 20px;
  }

  ${media.sm`
    > ${FooterItem} {
      margin-bottom: 0;
    }
    flex-direction: row;
    position: fixed;
    bottom: 0;
    z-index: 1000;
    height: ${size('footerHeight', '50px')};
    padding: 0 30px;
  `}

  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${palette('background', 0)};

  /* TODO: Refactor these to avoid using classnames */
  .footer-logo {
    cursor: pointer;
    img {
      height: 30px;
    }
  }
  .footer-links-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 280px;

    a {
      font-family: 'Montserrat Bold';
      font-size: ${key('sizes.font.normal', '12px')};
      color: ${palette('text', 6)};
      letter-spacing: 1px;
      cursor: pointer;
    }
  }
  .footer-social-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 200px;

    a {
      font-size: 18px;
      color: ${palette('text', 6)};
      cursor: pointer;
    }
  }
`;
