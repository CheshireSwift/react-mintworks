import { h } from 'react-hyperscript-helpers';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, object } from '@storybook/addon-knobs';
import emoji from 'node-emoji';

import { CardType } from '../card';
import Neighborhood from './Neighborhood';

storiesOf('Neighborhood', module)
  .addDecorator(withKnobs)
  .add('Spread', () =>
    h(Neighborhood, {
      cards: [
        {
          name: 'Mine',
          cost: 2,
          picture: emoji.get('pick'),
          effect: '*Upkeep:* Gain ()',
          score: 2,
          type: CardType.Production
        },
        {
          name: 'Gardens',
          cost: 3,
          picture: emoji.get('blossom'),
          effect: '',
          score: 3,
          type: CardType.Culture
        },
        {
          name: 'Aubergine',
          cost: 69,
          picture: emoji.get('eggplant'),
          effect: 'Nice.',
          score: 5,
          type: CardType.Culture
        },
        {
          name: 'Crane',
          cost: 2,
          picture: emoji.get('building_construction'),
          effect: 'You pay () less at the *Builder*',
          score: 1,
          type: CardType.Utility
        }
      ]
    })
  );
