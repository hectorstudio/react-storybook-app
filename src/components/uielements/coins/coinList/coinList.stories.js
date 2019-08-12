import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import AppHolder from '../../../../AppStyle';
import { defaultTheme } from '../../../../settings';

import CoinList from './coinList';
import { assetsData, stakeData } from './data';

storiesOf('Components/Coins/CoinList', module).add('default', () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AppHolder>
        <div style={{ display: 'flex', flexDirection: 'row', width: '800px' }}>
          <div style={{ display: 'inline-block', width: '300px' }}>
            <CoinList data={assetsData} value={2} />
          </div>
          <div style={{ display: 'block', width: '300px' }}>
            <CoinList data={stakeData} />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '800px',
            marginTop: '20px',
          }}
        >
          <div style={{ display: 'inline-block', width: '300px' }}>
            <CoinList data={assetsData} size="big" />
          </div>
          <div style={{ display: 'block', width: '300px' }}>
            <CoinList data={stakeData} size="big" />
          </div>
        </div>
      </AppHolder>
    </ThemeProvider>
  );
});
