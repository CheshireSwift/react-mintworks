import { h } from 'react-hyperscript-helpers';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number, select } from '@storybook/addon-knobs';
import emoji from 'node-emoji';

import { Card, CardType } from './Card';

storiesOf('Card', module)
  .addDecorator(withKnobs)
  .add('Back', () => h(Card, { card: null }))
  .add('Front', () =>
    h(Card, {
      card: {
        name: text('Name', 'Mine'),
        cost: number('Cost', 2),
        picture: emoji.get(text('Picture', 'pick')),
        effect: text('Effect', '*Upkeep:* Gain ()'),
        score: number('Score', 2),
        type: select('Type', CardType, CardType.Production)
      }
    })
  )
  .add('Spread', () =>
    h('div', { style: { display: 'flex' } }, [
      h(Card, {
        card: {
          name: 'Mine',
          cost: 2,
          picture: emoji.get('pick'),
          effect: '*Upkeep:* Gain ()',
          score: 2,
          type: CardType.Production
        }
      }),
      h(Card, {
        card: {
          name: 'Gardens',
          cost: 3,
          picture: emoji.get('blossom'),
          effect: '',
          score: 3,
          type: CardType.Culture
        }
      }),
      h(Card, {
        card: {
          name: 'Crane',
          cost: 2,
          picture: emoji.get('building_construction'),
          effect: 'You pay () less at the *Builder*',
          score: 1,
          type: CardType.Utility
        }
      })
    ])
  );
