import { CastMember } from '../../model/CastMember';
import { Character } from '../../model/data/Character';
import { Role } from '../../model/data/Role';

export const requireOppositeSex =
  (role: Role) =>
  (character: Character, cast: Array<CastMember>): boolean => {
    // If the character is sexless, we have to stop.
    if (!(character.isFemale() || character.isMale())) {
      return false;
    }

    // Find the partner in the cast, if it's present.
    const partner = cast.find((c) => c.role.id === role.id);
    // If the partner wasn't found, then we can pick whatever we want.
    if (partner === undefined) {
      return true;
    }

    // If the partner was found, we need to be of opposite sex.
    const pc = partner.character;
    return character.isFemale() ? pc.isMale() : pc.isFemale();
  };
