import * as R from 'ramda';
import { div, h } from 'react-hyperscript-helpers';
import emoji from 'node-emoji';

import { CardConfig, typeConfig } from '../card';

type NeighborhoodProps = {
  cards: CardConfig[];
};

const BuildingIcon = (props: CardConfig) =>
  div(
    {
      key: props.name,
      style: {
        textAlign: 'center',
        backgroundColor: typeConfig[props.type].color,
        width: '4rem',
        height: '4rem',
        padding: '0.3rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        margin: '0.25rem'
      }
    },
    [
      div({ style: { fontSize: 24 } }, props.picture),
      div(
        { style: { fontSize: 10, wordBreak: 'break-all' } },
        R.repeat(emoji.get('star'), props.score)
      )
    ]
  );

export const Neighborhood = ({ cards }: NeighborhoodProps) =>
  div(
    {
      style: {
        width: '10rem',
        backgroundColor: 'grey',
        padding: '0.3rem',
        display: 'flex',
        flexWrap: 'wrap',
        border: '0.2rem dashed white'
      }
    },
    cards.map(card => h(BuildingIcon, card))
  );

export default Neighborhood;
