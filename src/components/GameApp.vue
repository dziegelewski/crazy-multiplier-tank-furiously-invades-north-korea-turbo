<template>
  <div class="app">

    <DeveloperPanel />

    <TheQuestion />

    <MainInput />
    
    <KeyboardListener />
    <KeyboardWidget />

    <ScoresCounter />

    <HeartsContainer v-if="foe" :hearts="foe.hearts" style="background: lime;" />
    <HeartsContainer :hearts="heroHearts" style="background: #FFA4A4;" />

  </div>
</template>

<script>
import KeyboardListener from '@/components/KeyboardListener';
import KeyboardWidget from '@/components/KeyboardWidget';
import MainInput from '@/components/MainInput';
import DeveloperPanel from '@/components/DeveloperPanel';
import TheQuestion from '@/components/TheQuestion';
import ScoresCounter from '@/components/ScoresCounter';
import HeartsContainer from '@/components/HeartsContainer';

import { mapState } from 'vuex';

export default {
  name: 'GameApp',
  components: {
    KeyboardListener,
    KeyboardWidget,
    MainInput,
    DeveloperPanel,
    ScoresCounter,
    TheQuestion,
    HeartsContainer,
  },
  computed: {
    ...mapState([
      'foe',
      'heroHearts',
    ]),
  }
};
</script>

<style>

</style>