<template>
  <div class="app">

    <DeveloperPanel />

    <TheQuestion />

    <MainInput />
    
    <KeyboardListener />
    <KeyboardWidget />

    <ScoresCounter />

  </div>
</template>

<script>
import KeyboardListener from '@/components/KeyboardListener';
import KeyboardWidget from '@/components/KeyboardWidget';
import MainInput from '@/components/MainInput';
import DeveloperPanel from '@/components/DeveloperPanel';
import TheQuestion from '@/components/TheQuestion';
import ScoresCounter from '@/components/ScoresCounter';

export default {
  name: 'GameApp',
  components: {
    KeyboardListener,
    KeyboardWidget,
    MainInput,
    DeveloperPanel,
    ScoresCounter,
    TheQuestion,
  },
};
</script>

<style>

</style>