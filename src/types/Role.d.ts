export interface Role {
  id: string;
  name: string;
  max?: number;
  isCulprit?: 'always' | 'never';
}
