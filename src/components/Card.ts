import { Fragment, ReactNode, ReactElement, ReactNodeArray } from 'react';
import { div, h1, h, strong } from 'react-hyperscript-helpers';
import * as R from 'ramda';
import emoji from 'node-emoji';

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

const Mint = (props: { size?: number; compact?: boolean }) =>
  div(
    {
      style: {
        fontSize: props.size,
        display: 'inline-block',
        letterSpacing: props.compact && props.size && -props.size * 0.6
      }
    },
    emoji.get('white_circle')
  );

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

export function renderEffect(effect: ReactNode): ReactNodeArray {
  if (typeof effect !== 'string') {
    return [effect];
  }

  function insertMints(segment: string): ReactNode[] {
    return R.intersperse<ReactElement | string>(
      h(Mint, { size: 16 }),
      segment.split('()')
    );
  }
  const effectSpans = effect.split('*');
  const effectSpansWithBolds = R.flatten(
    R.addIndex<string, React.ReactNode>(R.map)(
      (segment: string, index: number) =>
        index % 2 ? [strong(insertMints(segment))] : insertMints(segment),
      effectSpans
    )
  );

  return effectSpansWithBolds;
}

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
    [card && h(CardFace, card)]
  );

export default Card;
