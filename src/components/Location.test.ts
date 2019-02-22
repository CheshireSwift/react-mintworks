import { render } from 'enzyme';
import { h } from 'react-hyperscript-helpers';
import emoji from 'node-emoji';

import { Location, LocationType } from './Location';

const mintIcon = emoji.get('white_circle');
const deedIcon = emoji.get('scroll');

describe('Location component', () => {
  const builderConfig = {
    name: 'Builder',
    type: LocationType.Basic,
    spaces: { available: true, cost: '2', count: 3, filled: 1 },
    effect: 'Build one of your Plans'
  };

  const wholesalerConfig = {
    name: 'Wholesaler',
    type: LocationType.Deed,
    spaces: { available: false, cost: '1', count: 1, filled: 0 },
    effect: 'Gain ()()',
    ownerEffect: '*Upkeep:* If occupied, Gain ()'
  };

  it('matches the builder snapshot', () => {
    expect(render(h(Location, builderConfig))).toMatchSnapshot();
  });

  it('matches the lotto snapshot', () => {
    expect(render(h(Location, wholesalerConfig))).toMatchSnapshot();
  });

  describe('basic display', () => {
    const builderText = render(h(Location, builderConfig)).text();

    it('includes the name', () => {
      expect(builderText).toContain(builderConfig.name);
    });

    it('includes the effect', () => {
      expect(builderText).toContain(builderConfig.effect);
    });

    it('includes the spaces', () => {
      expect(builderText).toContain(mintIcon + '2' + '2');
    });
  });

  describe('advanced display', () => {
    const wholesalerText = render(h(Location, wholesalerConfig)).text();

    it('includes the type icon', () => {
      expect(wholesalerText).toContain(deedIcon);
    });

    it('parses the effect text', () => {
      expect(wholesalerText).toContain('Gain ' + mintIcon + mintIcon);
    });

    it('includes the parsed owner text', () => {
      expect(wholesalerText).toContain('Owner');
      expect(wholesalerText).toContain('Upkeep: If occupied, Gain ' + mintIcon);
    });

    it('replaces the spaces with deed instructions when not available', () => {
      expect(wholesalerText).not.toContain('1');
      expect(wholesalerText).toContain('Build deed to open');
    });

    it('can display the owner when provided', () => {
      expect(
        render(h(Location, { ...wholesalerConfig, owner: 'Lisa' })).text()
      ).toContain('Lisa');
    });
  });
});
