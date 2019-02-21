import { render } from 'enzyme';
import { h } from 'react-hyperscript-helpers';
import emoji from 'node-emoji';

import { Card, CardType } from './Card';

const mintIcon = emoji.get('white_circle');
const starIcon = emoji.get('star');
const utilityIcon = emoji.get('wrench');

describe('Card component', () => {
  const mineConfig = {
    name: 'Mine',
    cost: 2,
    picture: '⛏️',
    effect: '*Upkeep:* Gain ()',
    score: 2,
    type: CardType.Production
  };

  const itDisplaysThe = (field: string, value: any) => {
    it(`displays the ${field}`, () => {
      expect(render(h(Card, { card: mineConfig })).text()).toContain(value);
    });
  };

  it('matches the face snapshot', () => {
    expect(render(h(Card, { card: mineConfig }))).toMatchSnapshot();
  });

  it('matches the back snapshot', () => {
    expect(render(h(Card, { card: null }))).toMatchSnapshot();
  });

  itDisplaysThe('name', mineConfig.name);
  itDisplaysThe('picture', mineConfig.picture);

  it(`displays the cost as ${mintIcon}`, () => {
    expect(
      render(h(Card, { card: { ...mineConfig, cost: 3 } })).text()
    ).toContain(mintIcon + mintIcon + mintIcon);
  });

  it(`displays the score as ${starIcon}`, () => {
    expect(
      render(h(Card, { card: { ...mineConfig, score: 4 } })).text()
    ).toContain(starIcon + starIcon + starIcon + starIcon);
  });

  describe('effect text', () => {
    it('adds strong tags for asterisk delimited bold sections in the effect', () => {
      const strongTags = render(
        h(Card, {
          card: { ...mineConfig, effect: '*bold1* not bold *bold2*' }
        })
      ).find('strong');
      expect(strongTags.length).toBe(2);
      expect(strongTags.text()).toBe('bold1bold2');
    });

    it('displays mints', () => {
      expect(
        render(
          h(Card, {
            card: { ...mineConfig, effect: '*Upkeep:* Gain ()()()()' }
          })
        ).text()
      ).toContain(`Upkeep: Gain ${mintIcon + mintIcon + mintIcon + mintIcon}`);
    });
  });

  describe('type indicator', () => {
    it('displays an emoji for the type', () => {
      expect(
        render(
          h(Card, { card: { ...mineConfig, type: CardType.Utility } })
        ).text()
      ).toContain(utilityIcon);
    });
  });
});
