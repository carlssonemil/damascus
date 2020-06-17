<template>
  <div class="debug">
    <h2>Debug</h2>

    <button @click="$store.dispatch('completeDamascus')">Complete Damascus</button>
    <button @click="$store.dispatch('completeAll')">Complete all</button>
    <button @click="$store.dispatch('completeMastery')">Complete mastery</button>
    <button @click="$store.dispatch('completeAllButOne')">Complete 99%</button>
    <button @click="$store.dispatch('resetProgress')">Reset progress</button>
    <button @click="$store.dispatch('resetMastery')">Reset mastery</button>
    <button @click="$store.dispatch('resetReticles')">Reset reticles</button>
    <button @click="$store.dispatch('clearLocalStorage')">Clear storage</button>
  </div>
</template>

<script>
export default {
  name: 'debug'
}
</script>

<style lang="scss" scoped>
.debug {
  background: $elevation-6-color;
  border-radius: $border-radius;
  bottom: 100px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: fixed;
  right: 25px;
  z-index: 9;

  @media (max-width: $tablet) {
    display: none;
  }

  h2 {
    font-weight: 600;
    margin-bottom: 25px;
  }

  button + button {
    margin-top: 10px;
  }
}
</style>