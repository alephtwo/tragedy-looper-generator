import { Location } from '../model/data/Location';

export const Locations: LocationsDatabase = {
  city: {
    id: '6699634d-728b-4efe-8279-ffaea3456dcd',
    name_i18n_key: 'locations.city',
  },
  hospital: {
    id: 'a9abc95c-532c-4fee-a8b2-9c51d691410e',
    name_i18n_key: 'locations.hospital',
  },
  school: {
    id: 'f9f610a0-9503-4b52-9965-93c76b69c6ae',
    name_i18n_key: 'locations.school',
  },
  shrine: {
    id: 'a5fbeabf-7039-4999-a364-9b4c4589bd40',
    name_i18n_key: 'locations.shrine',
  },
  chooseEveryLoop: {
    id: 'e79222de-b029-43a7-aca7-84acab6f059e',
    name_i18n_key: 'locations.chooseEveryLoop',
  },
};

interface LocationsDatabase {
  city: Location;
  hospital: Location;
  school: Location;
  shrine: Location;
  chooseEveryLoop: Location;
}
