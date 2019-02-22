import { render } from 'enzyme';
import { div } from 'react-hyperscript-helpers';
import emoji from 'node-emoji';

import renderEffect from './renderEffect';

const mintIcon = emoji.get('white_circle');

describe('effect renderer', () => {
  it('puts strong tags around asterisk delimited substrings', () => {
    const effectDiv = render(div(renderEffect('*bold1* not bold *bold2*')));
    const strongTags = effectDiv.find('strong');
    expect(strongTags.length).toBe(2);
    expect(strongTags.text()).toBe('bold1bold2');
  });

  it('replaces () with ' + mintIcon, () => {
    expect(
      render(div(renderEffect('*Upkeep:* Gain ()()()()'))).text()
    ).toContain(`Upkeep: Gain ${mintIcon + mintIcon + mintIcon + mintIcon}`);
  });
});
