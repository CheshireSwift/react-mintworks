import { h } from 'react-hyperscript-helpers';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number, select } from '@storybook/addon-knobs';

import { Card, CardType } from './Card';
import allEmoji from '../allEmoji';

storiesOf('Card', module)
  .addDecorator(withKnobs)
  .add('Back', () => h(Card, { card: null }))
  .add('Front', () =>
    h(Card, {
      card: {
        name: text('Name', 'Mine'),
        cost: number('Cost', 2),
        picture: select('Picture', allEmoji, '⛏️'),
        effect: text('Effect', '*Upkeep:* Gain ()'),
        score: number('Score', 2),
        type: select('Type', CardType, CardType.Production)
      }
    })
  );
