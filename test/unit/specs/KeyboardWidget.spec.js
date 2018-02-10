import { shallow } from 'vue-test-utils';
import sinon from 'sinon';

import KeyboardWidget from '@/components/KeyboardWidget.vue';

const wrapper = shallow(KeyboardWidget);

wrapper.setMethods({
  userInput() {},
});

describe('KeyboardWidget.vue', () => {
	 it('triggers userInput when button is pressed', () => {
	 	 sinon.spy(wrapper.vm, 'userInput');
	 	 wrapper.find('button').trigger('click');
	 	 expect(wrapper.vm.userInput.called).to.be.true;
	 });

	 it('renders 11 buttons', () => {
	 	const numberOfButtons = wrapper.findAll('button').length;
	 	expect(numberOfButtons).to.be.equal(11);
	 });
});
