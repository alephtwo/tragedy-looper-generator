export class Character {
  readonly id: string;
  readonly name: string;
  readonly descriptors: Set<Descriptor>;

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
}

type Descriptor = 'Student' | 'Boy' | 'Girl' | 'Adult' | 'Man' | 'Woman' | 'Construct' | 'Fabrication' | 'Animal';
