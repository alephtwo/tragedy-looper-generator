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

  isMale(): boolean {
    return this.descriptors.has('Boy') || this.descriptors.has('Man');
  }

  isFemale(): boolean {
    return this.descriptors.has('Girl') || this.descriptors.has('Woman');
  }
}

interface Fields {
  readonly id: string;
  readonly name: string;
  readonly descriptors: Array<Descriptor>;
  readonly roleLogic?: RoleLogic;
}

export type Descriptor =
  | 'Student'
  | 'Boy'
  | 'Girl'
  | 'Adult'
  | 'Man'
  | 'Woman'
  | 'Construct'
  | 'Fabrication'
  | 'Animal';

type RoleLogic = (allRoles: Array<Role>, plotRoles: Array<Role>) => Role;
