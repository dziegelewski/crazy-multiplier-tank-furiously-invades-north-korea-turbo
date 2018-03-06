import Hero from "@/classes/Hero";
import retrieve from '@/utils/retrieve';

export const generateInitialState = () => ({
	mode: 'menu',

  score: 0,
  hero: new Hero({ hearts: 3, maxHearts: 9 }),
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