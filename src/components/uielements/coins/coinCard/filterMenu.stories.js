import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import FilterMenu from './filterMenu';
import AppHolder from '../../../../AppStyle';
import { defaultTheme } from '../../../../settings';
import CoinData from '../coinData';
import { getTickerFormat } from '../../../../helpers/stringHelper';

function filterFunction(item, searchTerm) {
  const tokenName = getTickerFormat(item.asset);
  return tokenName.indexOf(searchTerm.toLowerCase()) === 0;
}

function cellRenderer(data) {
  const { asset: key, price } = data;
  const tokenName = getTickerFormat(key);
  const node = <CoinData asset={tokenName} price={price} />;
  return { key, node };
}

storiesOf('Components/Coins/FilterMenu', module).add('default', () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AppHolder>
        <FilterMenu
          searchEnabled
          filterFunction={filterFunction}
          cellRenderer={cellRenderer}
          onChangeAsset={() => {}}
          onBlurDropdown={() => {}}
          asset="TOMOB-1E1"
          data={[
            { asset: 'FSN-F1B', assetValue: 99, price: 1 },
            { asset: 'FTM-585', assetValue: 993, price: 1 },
            { asset: 'LOK-3C0', assetValue: 3971, price: 0 },
            { asset: 'TCAN-014', assetValue: 8935, price: 1 },
            { asset: 'TOMOB-1E1', assetValue: 198, price: 1 },
            { asset: 'BNB', assetValue: 200.01, price: 0.00387 },
          ]}
        />
      </AppHolder>
    </ThemeProvider>
  );
});
