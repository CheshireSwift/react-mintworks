import { ReactNode, ReactElement, ReactNodeArray } from 'react';
import { strong } from 'react-hyperscript-helpers';
import * as R from 'ramda';
import emoji from 'node-emoji';

export function renderEffect(effect: ReactNode): ReactNodeArray {
  if (typeof effect !== 'string') {
    return [effect];
  }

  function insertMints(segment: string): ReactNode[] {
    return R.intersperse<ReactElement | string>(
      emoji.get('white_circle'),
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

export default renderEffect;
