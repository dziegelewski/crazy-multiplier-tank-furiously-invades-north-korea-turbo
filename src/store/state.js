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

  audioEnabled: true, 
  musicEnabled: true,
});

export default generateInitialState();
