<template>
  <div class="app">


    <GameInfo />
    <BattleGround />

    <KeyboardWidget />
    <KeyboardListener />
  </div>
</template>

<script>
  import BattleGround from '@/components/BattleGround';
  import KeyboardWidget from '@/components/KeyboardWidget';
  import KeyboardListener from '@/components/KeyboardListener';
  import GameInfo from '@/components/GameInfo';
  import { mapActions } from 'vuex';

export default {
  name: 'GameApp',
  components: {
    BattleGround,
    KeyboardWidget,
    KeyboardListener,
    GameInfo,
  },

  methods: {
    ...mapActions([
      'beginGame',
    ]),
  },
  mounted() {
    this.beginGame();
  },
};
</script>

<style>
body {
  background: #C6C0C0;
  margin: 0 auto;
  max-width: 600px;

}

</style>