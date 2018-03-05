import Vehicle from "@/classes/Vehicle";
import retrieve from '@/utils/retrieve';

export const generateInitialState = () => ({
	mode: 'menu',

	speed: 0,

  score: 0,
  hero: new Vehicle({ name: 'hero', hearts: 3, maxHearts: 9 }),
  lastEnteredProvince: null,

  province: null,
  foe: null,
  challenge: null,

  message: null,
  typingLocked: false,
  menuInput: [],

  audioEnabled: retrieve('audioEnabled'), 
  musicEnabled: retrieve('musicEnabled'),

  incomingPerk: null,
});

export default generateInitialState();