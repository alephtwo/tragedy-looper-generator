export interface Trigger {
  id: string;
  description: TriggerDescription;
  order: number;
}

type TriggerDescription =
  | 'Always'
  | 'Loop Start'
  | 'Card Resolve'
  | 'Goodwill Ability Step'
  | 'Incident Step'
  | 'Day End'
  | 'Day End (Last Day)'
  | 'Loop End'
  | 'When this Role is to be Revealed'
  | 'When Character Dies'
  | 'When the Lover Dies'
  | 'When the Loved One Dies';
