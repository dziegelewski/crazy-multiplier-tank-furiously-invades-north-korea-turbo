import { shallow, mount } from 'vue-test-utils';
import sinon from 'sinon';

import KeyboardListener from '@/components/KeyboardListener.vue';

const DIGIT_0 = 48;
const NUMPAD_0 = 96;
const BACKSPACE = 8;
const DELETE = 46;
const CHAR_A = 65;


const wrapper = shallow(KeyboardListener, {
	attachToDocument: true,
});

wrapper.setMethods({
	userInput: function() {},
	userUndo: function() {},
})

const sandbox = sinon.sandbox.create();

describe('KeyboardListener.vue', () => {
	 beforeEach(function() {
		 	sandbox.restore();
    });

	 it('nothing is rendered', () => {
    expect(wrapper.html()).to.be.undefined;
  })

	 it('registers pressed keys', () => {
	 	 sandbox.spy(wrapper.vm, 'registerKeydown');
	 	 wrapper.trigger('keydown');
	 	 expect(wrapper.vm.registerKeydown.called).to.be.true;
	 })

	 it('triggers userInput if a digit or a numpad is pressed', () => {
	 		sandbox.spy(wrapper.vm, 'userInput');
	 		wrapper.trigger('keydown', { which: DIGIT_0 });
	 		expect(wrapper.vm.userInput.called).to.be.true;
	 })

	 it('triggers userUndo if a backspace is pressed', () => {
	 		sandbox.spy(wrapper.vm, 'userUndo');
	 		wrapper.trigger('keydown', { which: BACKSPACE });
	 		expect(wrapper.vm.userUndo.called).to.be.true;
	 })

	 it('does not trigger anything if a regular char is pressed', () => {
	 		sandbox.spy(wrapper.vm, 'userInput');
	 		sandbox.spy(wrapper.vm, 'userUndo');
	 		wrapper.trigger('keydown', { which: CHAR_A });
	 		expect(wrapper.vm.userUndo.called).to.be.false;
	 		expect(wrapper.vm.userInput.called).to.be.false;
	 })

})