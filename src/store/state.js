import Hero from "@/classes/Hero";
import retrieve from '@/utils/retrieve';
import { isDeviceBig } from '@/utils/functions';

export const generateInitialState = () => ({
	mode: 'menu',

  score: 0,
  hero: new Hero({ hearts: 3, maxHearts: 9 }),
  lastEnteredProvince: null,

  startingProvince: 1,
  province: null,
  foe: null,
  challenge: null,

  message: null,
  typingLocked: false,
  menuInput: [null],

  audioEnabled: retrieve('audioEnabled', { default: isDeviceBig() }),
  musicEnabled: retrieve('musicEnabled', { default: isDeviceBig() }),

  incomingPerk: null,

  highscore: retrieve('highscore', { default: 0 }),

  games: 0,
  summary: {
    foesKilled: 0,
    shots: 0,
    hits: 0,
    distance: 0,
    perks: 0,
  },
});

export default generateInitialState();
