export interface Role {
  readonly id: string;
  readonly name: string;
  readonly unkillable: boolean;
  readonly max?: number;
  readonly goodwillRefusal?: 'Optional' | 'Mandatory';
}
