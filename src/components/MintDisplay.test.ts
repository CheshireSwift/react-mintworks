import { render } from 'enzyme';
import { h } from 'react-hyperscript-helpers';
import emoji from 'node-emoji';

import MintDisplay from './MintDisplay';

const mintIcon = emoji.get('white_circle');
const bigMintIcon = emoji.get('red_circle');

describe('Mint display', () => {
  const mintDisplayText = render(h(MintDisplay, { count: 3 })).text();

  it('matches the snapshot', () => {
    expect(
      render(h(MintDisplay, { count: 16, style: { fontSize: 'larger' } }))
    ).toMatchSnapshot();
  });

  it('shows the mint count visually + numerically', () => {
    expect(mintDisplayText).toEqual(mintIcon + mintIcon + mintIcon + '3');
  });

  it('uses red mints for high mint counts', () => {
    const bigMintDisplayText = render(h(MintDisplay, { count: 17 })).text();

    expect(bigMintDisplayText).toEqual(
      bigMintIcon + bigMintIcon + bigMintIcon + mintIcon + mintIcon + '17'
    );
  });
});
