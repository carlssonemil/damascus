<template>
  <div class="loader"
      :class="{ inverted }"
      :style="{
        borderWidth: thickness + 'px',
        borderColor: 'rgba(' + color + ', .25)',
        borderLeftColor: color,
        height: size + 'px',
        width: size + 'px'
      }"></div>
</template>

<script>
export default {
  name: 'loader',
  props: [
    'size',
    'thickness',
    'color',
    'inverted'
  ]
}
</script>

<style lang="scss" scoped>
.loader {
  $size: 30px;

  animation: spin 1.2s linear infinite; 
  border: 4px solid rgba(black, .25);
  border-left-color: black;
  border-radius: 50%;
  display: inline-block;
  height: $size;
  width: $size;

  &.inverted {
    border-color: rgba(white, .25);
    border-left-color: white;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>