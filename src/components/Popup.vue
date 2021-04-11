<template>
  <transition name="fade">
      <div class="popup" v-if="show">
        <div class="modal">
          <eva-icon class="close-icon" name="close" fill="white" @click="hide()"></eva-icon>
          <div class="content">
            <slot></slot>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
  export default {
    props: ['id'],

    data() {
      return {
        show: false
      }
    },

    methods: {
      hide() {
        this.show = false;
        
        localStorage.setItem(this.id, JSON.stringify({
          hide: true
        }));
      }
    },

    beforeMount() {
      this.show = !JSON.parse(localStorage.getItem(this.id));
    }
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
    background: $red;
    border-radius: $border-radius;
    padding: 25px;
    position: relative;
    width: 100%;
    z-index: 1;

    .close-icon {
      cursor: pointer;
      opacity: .75;
      position: absolute;
      right: 10px;
      top: 12.5px;
      transition: $transition;

      @media (max-width: $tablet) {
        opacity: 1;
      }

      &:hover {
        opacity: 1;
      }
    }

    .content {
      line-height: 1.4;
      padding-right: 20px;
    }
  }
}
</style>