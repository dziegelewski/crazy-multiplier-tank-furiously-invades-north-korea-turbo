import actionsForProvinces from '@/store/actionsForProvinces';
import actionsForInput from '@/store/actionsForInput';
import actionsForFoe from '@/store/actionsForFoe';
import actionsForGame from '@/store/actionsForGame';
import actionsForChallenge from '@/store/actionsForChallenge';

export default {
  ...actionsForProvinces,
  ...actionsForFoe,
  ...actionsForInput,
  ...actionsForGame,
  ...actionsForChallenge,
};
