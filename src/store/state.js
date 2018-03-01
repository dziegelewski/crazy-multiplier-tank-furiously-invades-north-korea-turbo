import retrieve from '@/utils/retrieve';

export const generateInitialState = () => ({
	mode: 'menu',

	speed: 0,

  score: 0,
  heroHearts: 3,
  lastEnteredProvince: null,

  province: null,
  foe: null,
  challenge: null,

  message: null,
  typingLocked: false,
  menuInput: [],

  audioEnabled: retrieve('audioEnabled'), 
  musicEnabled: retrieve('musicEnabled'),
});

export default generateInitialState();