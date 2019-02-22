import { h } from 'react-hyperscript-helpers';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  text,
  number,
  select,
  boolean
} from '@storybook/addon-knobs';

import { Location, LocationProps, LocationType } from './Location';

function locationElement(
  defaults: Partial<LocationProps> & { type: LocationType; available: boolean }
) {
  const name = text('Name', defaults.name || null);
  const type = select('Type', LocationType, defaults.type);

  const cost = text('Spaces/Cost', '2');
  const count = number('Spaces/Count', 3);
  const filled = number('Spaces/Filled', 1);

  const effect = text('Effect', defaults.effect || null);

  const owner = text('Owner', defaults.owner || null);
  const ownerEffect = text('Owner Effect', defaults.ownerEffect || null);

  return h(Location, {
    name,
    type,
    spaces: { cost, count, filled },
    effect,
    owner,
    ownerEffect
  });
}
storiesOf('Location', module)
  .addDecorator(withKnobs)
  .add('Basic', () =>
    locationElement({
      name: 'Builder',
      type: LocationType.Basic,
      effect: 'Build one of your Plans',
      available: true
    })
  )
  .add('Deed', () =>
    locationElement({
      name: 'Lotto',
      type: LocationType.Deed,
      effect: 'Gain the top Plan from the Plan Deck',
      available: false,
      ownerEffect: '*Upkeep:* If occupied, Gain ()()'
    })
  );
