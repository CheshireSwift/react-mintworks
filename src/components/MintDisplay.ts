import { Fragment, CSSProperties } from 'react';
import { h, span } from 'react-hyperscript-helpers';
import * as R from 'ramda';
import emoji from 'node-emoji';

const Mint = (props: { bigMint: boolean; first: boolean }) =>
  span(
    { style: { marginLeft: props.first ? 0 : -16 } },
    emoji.get(props.bigMint ? 'red_circle' : 'white_circle')
  );

const firstMint = (bigMint: boolean, count: number) =>
  !!count && h(Mint, { bigMint, first: true });

const repeatMints = (bigMint: boolean) =>
  R.pipe(
    R.max<number>(0),
    R.repeat(h(Mint, { bigMint, first: false }))
  );

export const MintDisplay = ({
  count,
  style
}: {
  count: number;
  style?: CSSProperties;
}) => {
  const hasBigMints = count >= 5;
  return span({ style }, [
    firstMint(hasBigMints, count),
    ...repeatMints(true)(Math.floor(count / 5) - 1),
    ...repeatMints(false)((hasBigMints ? count : count - 1) % 5),
    count
  ]);
};

export default MintDisplay;
