<template>
  <div id="app" class="center-absolute">
    <shortLinkGen/>
  </div>
</template>

<script>
import shortLinkGen from './components/shortLinkGen.vue';

export default {
  name: 'App',
  components: {
    shortLinkGen
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>