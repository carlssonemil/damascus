<template>
  <transition name="fade">
      <div class="popup">
        <div class="modal">
          <div class="header" v-if="title">
            <h4>{{ title }}</h4>
          </div>
          <div class="content">
            <slot></slot>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
  export default {
    props: ['title']
  }
</script>

<style lang="scss" scoped>
.popup {
  bottom: 100px;
  left: 50%;
  max-width: $container-width;
  position: fixed;
  transform: translateX(-50%);
  width: 90%;
  z-index: 99;

  .modal {
    //background: $elevation-3-color;
    background: $red;
    border-radius: $border-radius;
    padding: 20px;
    width: 100%;
    z-index: 1;

    .content {
      line-height: 1.4;
    }
  }
}
</style>