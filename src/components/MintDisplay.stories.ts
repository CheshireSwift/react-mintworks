import { h } from 'react-hyperscript-helpers';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, object } from '@storybook/addon-knobs';

import MintDisplay from './MintDisplay';

storiesOf('Mint Display', module)
  .addDecorator(withKnobs)
  .add('Mint Display', () =>
    h(MintDisplay, {
      count: number('Count', 3),
      style: object('Style', undefined)
    })
  );
