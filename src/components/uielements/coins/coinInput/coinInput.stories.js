import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import AppHolder from '../../../../AppStyle';
import { defaultTheme } from '../../../../settings';

import CoinInput from './coinInput';

storiesOf('Components/Coins/CoinInput', module).add('default', () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AppHolder>
        <div
          style={{ display: 'flex', flexDirection: 'column', width: '300px' }}
        >
          <CoinInput asset="rune" amount={10000} price={0.04} />
        </div>
      </AppHolder>
    </ThemeProvider>
  );
});
