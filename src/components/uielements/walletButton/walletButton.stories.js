import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { Row } from 'antd';

import AppHolder from '../../../AppStyle';
import { defaultTheme } from '../../../settings';

import WalletButton from './walletButton';

storiesOf('Components/Button/WalletButton', module).add('default', () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AppHolder>
        <Row>
          <WalletButton />
          <WalletButton connected value="bnb12345645645645edf" />
        </Row>
      </AppHolder>
    </ThemeProvider>
  );
});
