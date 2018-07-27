import gb from './gb';
import ie from './ie';
import { resolveByCountry } from '../environment';

export const variants = { gb, ie };

export default resolveByCountry(gb, ie);
