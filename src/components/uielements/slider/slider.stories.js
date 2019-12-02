import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import AppHolder from '../../../AppStyle';
import { defaultTheme } from '../../../settings';

import Slider from './slider';

const marks = {
  0: '0%',
  100: '100%',
};

storiesOf('Components/Slider', module).add('default', () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AppHolder>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
          }}
        >
          <Slider defaultValue={30} />
          <Slider defaultValue={30} withLabel />
          <Slider defaultValue={30} marks={marks} />
        </div>
      </AppHolder>
    </ThemeProvider>
  );
});
