import { Fragment, ReactNode } from 'react';
import { div, h1, h } from 'react-hyperscript-helpers';
import * as R from 'ramda';
import emoji from 'node-emoji';

import renderEffect from './renderEffect';

export enum CardType {
  Culture,
  Production,
  Utility,
  Deed
}
type CardConfig = {
  name: string;
  cost: number;
  picture: string;
  effect: React.ReactNode;
  score: number;
  type: CardType;
};
type CardProps = {
  card: null | CardConfig;
};

const typeConfig: { [T in CardType]: { icon: string; color: string } } = {
  [CardType.Culture]: { icon: 'herb', color: 'yellowgreen' },
  [CardType.Production]: { icon: 'gear', color: 'indianred' },
  [CardType.Utility]: { icon: 'wrench', color: 'gold' },
  [CardType.Deed]: { icon: 'scroll', color: 'paleturquoise' }
};

const TypeDisplay = (props: { type: CardType }) =>
  div(
    { style: { position: 'absolute', top: '1em', right: '1em' } },
    emoji.get(typeConfig[props.type].icon)
  );

const CostDisplay = (props: { cost: number }) =>
  div(
    {
      style: { backgroundColor: '#ffffffaa', fontSize: 32, letterSpacing: -16 }
    },
    R.repeat(emoji.get('white_circle'), props.cost)
  );

const EffectDisplay = (props: { effect: ReactNode }) =>
  div(renderEffect(props.effect));

const ScoreDisplay = (props: { score: number }) =>
  div(R.repeat(emoji.get('star'), props.score));

const CardFace = ({ name, type, cost, picture, effect, score }: CardConfig) =>
  h(Fragment, [
    h1(name),
    h(TypeDisplay, { type }),
    h(CostDisplay, { cost }),
    div({ style: { fontSize: 72 } }, picture),
    h(EffectDisplay, { effect }),
    h(ScoreDisplay, { score })
  ]);

const CardBack = () =>
  div(
    {
      style: {
        margin: 'auto',
        fontSize: 192,
        opacity: 0.7,
        textShadow: '16px 8px gray'
      }
    },
    emoji.get('white_circle')
  );

export const Card = ({ card }: CardProps) =>
  div(
    {
      style: {
        textAlign: 'center',
        borderRadius: 4,
        border: '1px solid black',
        backgroundColor: card ? typeConfig[card.type].color : 'paleturquoise',
        height: 300,
        width: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: '1em',
        position: 'relative'
      }
    },
    [card ? h(CardFace, card) : h(CardBack)]
  );

export default Card;
