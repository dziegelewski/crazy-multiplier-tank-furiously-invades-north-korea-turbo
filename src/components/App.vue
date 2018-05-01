<template>
  <div
    class="app"
    :class="{ 'app--nuke': isNukeMode }"
  >

    <MenuMode v-if="isMenuMode" class="app__view" />
    <GameMode v-if="isGameMode" class="app__view" />
    <LoadingMode v-if="isLoadingMode" class="app__view" />

    <AnimatedArea class="app__animated-area" />

    <KeyboardWidget class="app__keyboard" />
    <KeyboardListener />
  </div>
</template>

<script>
  import KeyboardWidget from '@/components/KeyboardWidget';
  import KeyboardListener from '@/components/KeyboardListener';
  import GameMode from '@/components/GameMode';
  import MenuMode from '@/components/MenuMode';
  import LoadingMode from '@/components/LoadingMode';
  import AnimatedArea from '@/components/AnimatedArea';
  import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MainView',
  components: {
    AnimatedArea,
    KeyboardWidget,
    KeyboardListener,
    GameMode,
    MenuMode,
    LoadingMode,
  },

  methods: {
    ...mapActions([
      'beginGame',
      'startApp',
    ]),
  },

  computed: {
    ...mapGetters([
      'isMenuMode',
      'isGameMode',
      'isLoadingMode',
      'isNukeMode',
    ]),
  },

  created() {
    this.startApp();
  },
};
</script>

<style lang="scss">
  @import 'node_modules/reset-css/_reset';
  @import 'src/assets/styles/transitions';
  @import 'src/assets/styles/shared';
  @import 'src/assets/styles/app';

  
</style>