import { CastMember, Character } from '../types/Character';
import { Plot } from '../types/Plot';
import { Role } from '../types/Role';
import * as _ from 'lodash';

interface AssignRolesArgs {
  characters: Array<Character>;
  plots: Array<Plot>;
  roles: Array<Role>;
}

export function assignRoles(args: AssignRolesArgs): Array<CastMember> {
  // By now we have arrays of matched length: people and roles.
  // We have our pools; let's start.
  // Copy the arrays so as not to modify unintentionally. Our pools _will_ be modified.
  const rolePool = [...args.roles];
  const characterPool = [...args.characters];

  // Somewhere to store our results.
  const assignedRoles: Array<CastMember> = [];

  // Some roles have requirements. We need to account for those out of the gate.
  const rolesWithCriteria = args.plots
    .filter((p) => p.roleCriteria)
    // Trust me, this one is definitely non null.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .map((p) => p.roleCriteria!);

  rolesWithCriteria.forEach((criteria) => {
    // Find characters that match the criteria.
    const matchingCharacters = characterPool.filter(criteria.filter);
    // Pick a character that matches this criteria and give them that role.
    const character = _.sample(matchingCharacters) as Character;
    assignedRoles.push({
      role: criteria.role,
      character: character,
    });
    // Remove the character from the pool.
    _.remove(characterPool, (c: Character) => c.id === character.id);
    // Remove the role from the pool.
    // Note that this might happen multiple times, so we only want to remove ONE INSTANCE of that role from the pool.
    const indexToRemove = _.findIndex(rolePool, (r: Role) => r.id === criteria.role.id);
    rolePool.splice(indexToRemove, 1);
    console.log(`"${character.name}" was assigned to "${criteria.role.name}" by role or plot requirements.`);
  });

  // We've now assigned every mandatory role.
  // So now we can just zip whatever's left and mash them together.
  const remaining: Array<CastMember> = _.zipWith(rolePool, characterPool, (role: Role, character: Character) => ({
    role: role,
    character: character,
  }));

  return assignedRoles.concat(remaining);
}
