import { render, mount } from 'enzyme';
import { h } from 'react-hyperscript-helpers';

import App from './App';

describe('the app', () => {
  it('matches the snapshot', () => {
    expect(render(h(App))).toMatchSnapshot();
  });
});
