export enum CardType {
  Culture,
  Production,
  Utility,
  Deed
}

export type CardConfig = {
  name: string;
  cost: number;
  picture: string;
  effect: React.ReactNode;
  score: number;
  type: CardType;
};

export const typeConfig = {
  [CardType.Culture]: { icon: 'herb', color: 'yellowgreen' },
  [CardType.Production]: { icon: 'gear', color: 'indianred' },
  [CardType.Utility]: { icon: 'wrench', color: 'gold' },
  [CardType.Deed]: { icon: 'scroll', color: 'paleturquoise' }
};
