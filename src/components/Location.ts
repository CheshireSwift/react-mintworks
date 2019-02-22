import { Fragment } from 'react';
import { div, h1, h, strong } from 'react-hyperscript-helpers';
import * as R from 'ramda';
import emoji from 'node-emoji';

import renderEffect from './renderEffect';

export enum LocationType {
  Basic,
  Advanced,
  Deed
}

type SpacesProps = {
  cost: string;
  count: number;
  filled: number;
};

export type LocationProps = {
  name: string;
  type: LocationType;
  spaces: SpacesProps;
  effect: string;
  owner?: string;
  ownerEffect?: string;
};

const typeIcons: { [T in LocationType]: string } = {
  [LocationType.Basic]: emoji.get('amphora'),
  [LocationType.Advanced]: emoji.get('zap'),
  [LocationType.Deed]: emoji.get('scroll')
};

const Space = (props: { filled: boolean; cost: string }) =>
  div(
    {
      style: {
        border: '2px dashed floralwhite',
        borderRadius: 9999,
        width: '2.5rem',
        height: '2.5rem',
        margin: 'auto',
        fontSize: 30
      }
    },
    props.filled ? emoji.get('white_circle') : props.cost
  );

const Spaces = ({
  available,
  count,
  cost,
  filled
}: SpacesProps & { available: boolean }) =>
  h(
    Fragment,
    available
      ? R.range(0, count).map(i => h(Space, { cost, filled: i < filled }))
      : ['Build deed to open']
  );

const Owner = (props: { owner?: string; effect: string }) =>
  div(
    {
      style: {
        backgroundColor: 'lightskyblue',
        position: 'absolute',
        bottom: '0.3rem',
        left: '0.3rem',
        right: '0.3rem',
        padding: '0.5em',
        borderRadius: 4
      }
    },
    [
      div(
        {
          style: {
            position: 'absolute',
            right: 0,
            bottom: '2rem',
            backgroundColor: 'lightskyblue',
            borderRadius: 4,
            padding: '0.25rem 1rem'
          }
        },
        [strong('Owner'), props.owner && ` (${props.owner})`]
      ),
      div(renderEffect(props.effect))
    ]
  );

const sectionStyle = {
  borderRadius: 4,
  backgroundColor: 'paleturquoise'
};

const cardStyle = {
  width: '32rem',
  borderRadius: 4,
  border: '1px solid black',
  backgroundColor: 'floralwhite',
  display: 'grid',
  gridTemplateAreas: `"spaces name"
        "spaces effect"`,
  gridTemplateColumns: '5rem auto',
  gridTemplateRows: '4rem 8rem',
  gridGap: '1rem',
  textAlign: 'center',
  padding: '1rem',
  fontSize: 'larger'
};

export const Location = ({
  name,
  type,
  effect,
  spaces,
  owner,
  ownerEffect
}: LocationProps) =>
  div({ style: cardStyle }, [
    div({ style: { ...sectionStyle, gridArea: 'name' } }, [
      h1({ style: { margin: '0.5rem' } }, name)
    ]),
    div(
      {
        style: {
          ...sectionStyle,
          background: 'transparent',
          position: 'absolute',
          top: '1.15rem',
          left: '6.2rem',
          fontSize: 48
        }
      },
      typeIcons[type]
    ),
    div(
      {
        style: {
          ...sectionStyle,
          gridArea: 'effect',
          paddingTop: '1rem',
          position: 'relative'
        }
      },
      [
        div(renderEffect(effect)),
        ownerEffect && h(Owner, { owner, effect: ownerEffect })
      ]
    ),
    div(
      {
        style: {
          ...sectionStyle,
          gridArea: 'spaces',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          textTransform: 'uppercase',
          fontWeight: 'bold',
          fontSize: 24
        }
      },
      [h(Spaces, { ...spaces, available: !ownerEffect || !!owner })]
    )
  ]);
