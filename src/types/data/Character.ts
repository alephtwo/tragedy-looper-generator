import { Role } from './Role';

export class Character {
  readonly id: string;
  readonly name: string;
  readonly descriptors: Set<Descriptor>;
  readonly roleLogic?: RoleLogic;

  constructor(fields: Fields) {
    this.id = fields.id;
    this.name = fields.name;
    this.descriptors = new Set(fields.descriptors);
  }
}

interface Fields {
  readonly id: string;
  readonly name: string;
  readonly descriptors: Array<Descriptor>;
  readonly roleLogic?: RoleLogic;
}

type Descriptor = 'Student' | 'Boy' | 'Girl' | 'Adult' | 'Man' | 'Woman' | 'Construct' | 'Fabrication' | 'Animal';

type RoleLogic = (allRoles: Array<Role>, plotRoles: Array<Role>) => Role;
