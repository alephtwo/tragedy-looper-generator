export interface Role {
  readonly id: string;
  readonly name: string;
  readonly max?: number;
  readonly isCulprit?: 'always' | 'never';
}
