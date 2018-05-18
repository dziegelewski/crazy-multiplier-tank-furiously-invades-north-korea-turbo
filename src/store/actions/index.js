import inputActions from '@/store/actions/input_actions';
import challengesActions from '@/store/actions/challenges_actions';
import attacksActions from '@/store/actions/attacks_actions';
import provincesActions from '@/store/actions/provinces_actions';
import gameActions from '@/store/actions/game_actions';
import scoresActions from '@/store/actions/scores_actions';
import perksActions from '@/store/actions/perks_actions';
import messageActions from '@/store/actions/message_actions';
import preloadActions from '@/store/actions/preload_actions';
import gearActions from '@/store/actions/gear_actions';

export default {
	...inputActions,
	...challengesActions,
	...attacksActions,
	...provincesActions,
	...gameActions,
	...scoresActions,
	...messageActions,
	...perksActions,
	...gearActions,
	...preloadActions,
};
