import { wait } from '@/utils/functions';
import { longMoment } from '@/utils/waiting';

export default {
  async displayMessage({ commit, mutation }, message) {
    const duration = message.duration || longMoment;
    commit('changeMessage', message);
    await wait(duration);
    commit('changeMessage', null);
  },
};
