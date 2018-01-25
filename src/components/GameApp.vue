<template>
  <div class="app">

    <MainInput />
    
    <KeyboardListener />
    <KeyboardWidget />

  </div>
</template>

<script>
import KeyboardListener from '@/components/KeyboardListener';
import KeyboardWidget from '@/components/KeyboardWidget';
import MainInput from '@/components/MainInput';

export default {
  name: 'GameApp',
  components: {
    KeyboardListener,
    KeyboardWidget,
    MainInput,
  },
};
</script>

<style>

</style>