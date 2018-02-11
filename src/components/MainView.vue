<template>
  <div class="main-view">

    <MenuView v-if="isMenuMode" />
    <PlayView v-if="isPlayMode" />

    <BattleGround class="main-view__battle-ground" />

    <KeyboardWidget />
    <KeyboardListener />
  </div>
</template>

<script>
  import BattleGround from '@/components/BattleGround';
  import KeyboardWidget from '@/components/KeyboardWidget';
  import KeyboardListener from '@/components/KeyboardListener';
  import PlayView from '@/components/PlayView';
  import MenuView from '@/components/MenuView';
  import { mapGetters, mapActions } from 'vuex';


export default {
  name: 'MainView',
  components: {
    BattleGround,
    KeyboardWidget,
    KeyboardListener,
    PlayView,
    MenuView,
  },

  methods: {
    ...mapActions([
      'beginGame',
    ]),
  },

  computed: {
    ...mapGetters([
      'isMenuMode',
      'isPlayMode',
    ]),
  },

  mounted() {
    this.beginGame();
  },
};
</script>

<style lang="scss">
  @import 'node_modules/reset-css/_reset';
  body {
    background: black;
  }

  .main-view {
    background: white;;
    margin: 0 auto;
    max-width: 600px;
    height: 100vh;
    position: relative;
    overflow: hidden;

    &__battle-ground {

    }
  }
</style>