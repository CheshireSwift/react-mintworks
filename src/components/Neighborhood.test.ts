import { render } from 'enzyme';
import { h } from 'react-hyperscript-helpers';
import emoji from 'node-emoji';
import * as R from 'ramda';

import { CardType } from '../card';

import Neighborhood from './Neighborhood';

describe('the neighborhood', () => {
  const stars = (n: number) => R.repeat(emoji.get('star'), n).join('');

  const card = {
    name: 'Mine',
    cost: 2,
    picture: emoji.get('pick'),
    effect: '*Upkeep:* Gain ()',
    score: 2,
    type: CardType.Production
  };

  const cards = [card];

  const neighborhoodText = render(h(Neighborhood, { cards })).text();

  it('matches the snapshot', () => {
    expect(render(h(Neighborhood, { cards }))).toMatchSnapshot();
  });

  it('displays the buildings', () => {
    expect(neighborhoodText).toContain(card.picture);
  });

  it('displays the score for each building', () => {
    expect(neighborhoodText).toContain(stars(2));
    expect(neighborhoodText).not.toContain(stars(3));
  });
});
