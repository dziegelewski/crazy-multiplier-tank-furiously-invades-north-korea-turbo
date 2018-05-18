import Hero from "@/classes/Hero";
import retrieve from '@/utils/retrieve';
import { isDeviceBig } from '@/utils/functions';

const initialSpeed = 3;

export const generateInitialState = () => ({
	mode: 'menu',

  province: null,
  startingProvince: 1,
  lastEnteredProvince: null,
  showCurrentProvince: false,

  hero: new Hero({ hearts: 3, maxHearts: 9 }),

  foe: null,
  challenge: null,

  message: null,
  typingLocked: false,

  incomingPerk: null,
  baseSpeed: initialSpeed,
  speed: initialSpeed,

  score: 0,
  games: 0,
  menuInput: [null],
  highscore: retrieve('highscore', { default: 0 }),
  audioEnabled: retrieve('audioEnabled', { default: isDeviceBig() }),
  musicEnabled: retrieve('musicEnabled', { default: isDeviceBig() }),
  summary: {
    foesKilled: 0,
    shots: 0,
    hits: 0,
    distance: 0,
    perks: 0,
    isHighscore: 0,
  },
});

export default generateInitialState();
