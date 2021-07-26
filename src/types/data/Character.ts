export class Character {
  readonly id: string;
  readonly name: string;
  readonly descriptors: Set<Descriptor>;
  readonly #entersOnLoop?: (loops: number) => number;
  loopToEnter: number;

  constructor(fields: Fields) {
    this.id = fields.id;
    this.name = fields.name;
    this.descriptors = new Set(fields.descriptors);
    this.#entersOnLoop = fields.entersOnLoop;
    this.loopToEnter = 1; // by default
  }

  isMale(): boolean {
    return this.descriptors.has('Boy') || this.descriptors.has('Man');
  }

  isFemale(): boolean {
    return this.descriptors.has('Girl') || this.descriptors.has('Woman');
  }

  setLoopToEnter(loops: number): void {
    if (this.#entersOnLoop !== undefined) {
      this.loopToEnter = this.#entersOnLoop(loops);
    }
  }
}

interface Fields {
  readonly id: string;
  readonly name: string;
  readonly descriptors: Array<Descriptor>;
  readonly entersOnLoop?: (loops: number) => number;
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
