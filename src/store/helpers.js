import random from 'lodash/random';
import { doubleShooter, foresight } from '@/data/perks'

export function willPerkBeFound() {
  return random(0, 1) === 0;
}
