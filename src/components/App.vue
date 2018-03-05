<template>
  <div class="app">

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
  import { mapGetters, mapActions } from 'vuex';

  import AnimatedArea from '@/components/AnimatedArea';


export default {
  name: 'MainView',
  components: {
    AnimatedArea,
    KeyboardWidget,
    KeyboardListener,
    GameMode,
    MenuMode,
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

  mounted() {
    // this.beginGame();
  },
};
</script>

<style lang="scss">
  @import 'node_modules/reset-css/_reset';
  @import 'src/assets/styles/transitions';
  @import 'src/assets/styles/shared';
  @import 'src/assets/styles/app';

  
</style>