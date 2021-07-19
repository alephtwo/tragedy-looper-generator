export interface Role {
  readonly id: string;
  readonly name: string;
  readonly unkillable: boolean;
  readonly culprit: 'Never' | 'Optional' | 'Mandatory';
  readonly max?: number;
  readonly goodwillRefusal?: 'Optional' | 'Mandatory';
}
