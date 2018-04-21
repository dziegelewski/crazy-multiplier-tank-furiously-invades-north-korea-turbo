<template>
  <div
    class="app"
    :class="{ 'app--nuke': isNuked }"
  >

    <MenuMode v-if="isMenuMode" class="app__view" />
    <GameMode v-if="isGameMode" class="app__view" />

    <AnimatedArea class="app__animation-area" />

    <KeyboardWidget class="app__keyboard" />
    <KeyboardListener />
  </div>
</template>

<script>
  import KeyboardWidget from '@/components/KeyboardWidget';
  import KeyboardListener from '@/components/KeyboardListener';
  import GameMode from '@/components/GameMode';
  import MenuMode from '@/components/MenuMode';
  import AnimatedArea from '@/components/AnimatedArea';
  import { mapGetters, mapActions } from 'vuex';
  import eventBus from '@/utils/eventBus';
  import { wait } from '@/utils/functions';

export default {
  name: 'MainView',
  components: {
    AnimatedArea,
    KeyboardWidget,
    KeyboardListener,
    GameMode,
    MenuMode,
  },

  data() {
    return {
      isNuked: false,
    };
  },

  methods: {
    ...mapActions([
      'beginGame',
    ]),
  },

  computed: {
    ...mapGetters([
      'isMenuMode',
      'isGameMode',
    ]),
  },

  created() {
    eventBus.$on('nuke', () => {
      this.isNuked = true;
      wait(5000)
      .then(() => {
        this.isNuked = false;
      });
    });
  },
};
</script>

<style lang="scss">
  @import 'node_modules/reset-css/_reset';
  @import 'src/assets/styles/transitions';
  @import 'src/assets/styles/shared';
  @import 'src/assets/styles/app';

  
</style>