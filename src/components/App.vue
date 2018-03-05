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

  html {
    font-size: $base-font;
    @include small {
      font-size: 25px;
    }
    @include screen {
      font-size: 28px;
    }
  }


  body {
    background: black;
  }

  .app {
    background: white;;
    margin: 0 auto;
    max-width: $game-width;
    height: 100vh;
    position: relative;
    overflow: hidden;

    &__view {
      position: absolute;
      width: 100%;
      z-index: 1;
    }

    &__animation-area {
      top: 30vh;
      @include screen {
        top: none;
        bottom: 10%;
      }
    }
  }

  @include screen {
      body {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .app {
        width: 100%;
        max-width: 800px;
        max-height: 500px;
      }
    }
</style>